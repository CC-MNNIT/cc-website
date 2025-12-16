#!/usr/bin/env python3
"""
Data Validation Script for CC Website
Validates YAML data files and markdown frontmatter for consistency and required fields.
"""

import sys
import yaml
from pathlib import Path
from datetime import datetime

def validate_alumni_data(file_path):
    """Validate alumni YAML structure"""
    errors = []
    warnings = []
    
    try:
        with open(file_path, 'r') as f:
            data = yaml.safe_load(f)
        
        if not isinstance(data, dict) or 'alumni' not in data:
            errors.append(f"{file_path}: Missing 'alumni' key at root")
            return errors, warnings
        
        alumni_list = data['alumni']
        if not isinstance(alumni_list, list):
            errors.append(f"{file_path}: 'alumni' must be a list")
            return errors, warnings
        
        required_fields = ['name', 'batch', 'graduation_year']
        optional_fields = ['linkedin', 'github', 'image', 'current_role', 'company', 'domain', 'location', 'message', 'degree', 'branch', 'current_position']
        
        for idx, person in enumerate(alumni_list):
            for field in required_fields:
                if field not in person or not person[field]:
                    errors.append(f"{file_path}: Alumni #{idx+1} missing required field '{field}'")
            
            # Check batch year format (can be range like "2021-2025" or single year)
            if 'batch' in person:
                batch = str(person['batch'])
                # Allow formats: "2025" or "2021-2025"
                if '-' in batch:
                    parts = batch.split('-')
                    if len(parts) != 2 or not all(p.isdigit() and len(p) == 4 for p in parts):
                        errors.append(f"{file_path}: Alumni #{idx+1} has invalid batch format '{batch}' (expected YYYY or YYYY-YYYY)")
                elif not (batch.isdigit() and len(batch) == 4):
                    errors.append(f"{file_path}: Alumni #{idx+1} has invalid batch year '{batch}' (expected 4-digit year)")
            
            # Check for unknown fields
            for field in person:
                if field not in required_fields + optional_fields:
                    warnings.append(f"{file_path}: Alumni #{idx+1} has unknown field '{field}'")
    
    except yaml.YAMLError as e:
        errors.append(f"{file_path}: YAML parsing error - {e}")
    except FileNotFoundError:
        errors.append(f"{file_path}: File not found")
    
    return errors, warnings

def validate_frontmatter(file_path):
    """Validate markdown frontmatter"""
    errors = []
    warnings = []
    
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        if not content.startswith('+++'):
            warnings.append(f"{file_path}: No TOML frontmatter found")
            return errors, warnings
        
        # Extract frontmatter
        parts = content.split('+++', 2)
        if len(parts) < 3:
            errors.append(f"{file_path}: Invalid frontmatter format")
            return errors, warnings
        
        frontmatter = parts[1].strip()
        
        # Check for duplicate date fields
        if 'date =' in frontmatter and 'start_date =' in frontmatter:
            errors.append(f"{file_path}: Duplicate date fields (date and start_date)")
        
        # Check for [extra] section if taxonomies present
        if '[taxonomies]' in frontmatter:
            warnings.append(f"{file_path}: Using [taxonomies] - consider moving to [extra] for Goyo theme")
        
        # Check for required fields in event pages
        if '/events/' in str(file_path) and 'docker' not in str(file_path).lower():
            required = ['title', 'description', 'date']
            for field in required:
                if f'{field} =' not in frontmatter:
                    errors.append(f"{file_path}: Missing required field '{field}'")
    
    except FileNotFoundError:
        errors.append(f"{file_path}: File not found")
    except Exception as e:
        errors.append(f"{file_path}: Error reading file - {e}")
    
    return errors, warnings

def main():
    print("🔍 Validating CC Website Data Files\n")
    
    base_path = Path(__file__).parent.parent
    all_errors = []
    all_warnings = []
    
    # Validate alumni data file
    print("📋 Validating Alumni Data...")
    alumni_file = base_path / 'data' / 'alumni.yaml'
    if alumni_file.exists():
        errors, warnings = validate_alumni_data(alumni_file)
        all_errors.extend(errors)
        all_warnings.extend(warnings)
        if not errors and not warnings:
            print(f"  ✅ alumni.yaml")
    else:
        all_errors.append("data/alumni.yaml file not found")
    
    print()
    
    # Validate event markdown files
    print("📅 Validating Event Pages...")
    events_dir = base_path / 'content' / 'events'
    if events_dir.exists():
        for md_file in events_dir.rglob('*.md'):
            if md_file.name == '_index.md':
                continue
            errors, warnings = validate_frontmatter(md_file)
            all_errors.extend(errors)
            all_warnings.extend(warnings)
            if not errors and not warnings:
                print(f"  ✅ {md_file.relative_to(base_path)}")
    else:
        all_errors.append("content/events/ directory not found")
    
    print()
    
    # Validate contrihub pages
    print("🤝 Validating ContriHub Pages...")
    contrihub_dir = base_path / 'content' / 'contrihub'
    if contrihub_dir.exists():
        for md_file in contrihub_dir.rglob('*.md'):
            if md_file.name == '_index.md':
                continue
            errors, warnings = validate_frontmatter(md_file)
            all_errors.extend(errors)
            all_warnings.extend(warnings)
            if not errors and not warnings:
                print(f"  ✅ {md_file.relative_to(base_path)}")
    
    print()
    print("=" * 60)
    
    # Report summary
    if all_errors:
        print(f"\n❌ Found {len(all_errors)} error(s):")
        for error in all_errors:
            print(f"  • {error}")
    
    if all_warnings:
        print(f"\n⚠️  Found {len(all_warnings)} warning(s):")
        for warning in all_warnings:
            print(f"  • {warning}")
    
    if not all_errors and not all_warnings:
        print("\n✅ All validations passed!")
        return 0
    elif not all_errors:
        print("\n✅ No errors found (only warnings)")
        return 0
    else:
        print(f"\n❌ Validation failed with {len(all_errors)} error(s)")
        return 1

if __name__ == '__main__':
    sys.exit(main())
