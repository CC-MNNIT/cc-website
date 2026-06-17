# AQR Capital Management — Software Engineering Interview Experience

---

## Online Assessment (OA)

### DSA Problems
Two problems were asked:

1. **Dynamic Programming Problem** *(Medium)*
2. **Binary Search on Answer** *(Medium-Hard)*

### MCQs
15–20 questions on CS fundamentals.

---

## Interview Process

- **Minimum rounds:** 3
- **Maximum rounds:** 4
- **My experience:** 3 rounds

---

## Round 1 — CS Fundamentals

**Duration:** ~45 minutes

Topics covered from my resume: **Operating Systems**, **OOPs**, **Computer Networks** (DBMS was intentionally left out as I hadn't prepared it).

### Operating Systems
- Types of scheduling (preemptive & non-preemptive)
- Context switching
- Semaphores
- Deadlocks (conditions, prevention, avoidance)
- Virtual memory — asked in depth

> **Tip:** Luv Babbar's OS notes are sufficient to answer all these questions.

### Object-Oriented Programming
- 4 Pillars of OOPs
- Constructors and Destructors
- Abstract Classes
- Method Overloading and Overriding *(asked to write code and explain)*
- Virtual Functions and Pure Virtual Functions
- Base and Derived class concepts

---

## Round 2 — Data Structures & Algorithms

**Duration:** ~1 hour  
**Difficulty:** Medium-Hard

### Problem Overview
The problem involved two key techniques:

#### Step 1 — BFS on a Graph
- Used BFS to produce an intermediate output array
- Time Complexity: **O(N)**
- Interviewer asked for pseudo-code first, then implementation

#### Step 2 — Range Update Optimization
After getting the array from BFS, the task required multiple range update operations of the form `+x` on `[l1, r1]`, `-y` on `[l2, r2]`, etc., followed by computing a final prefix sum array.

| Approach | Time Complexity |
|----------|----------------|
| Brute Force | O(N²) |
| Difference Array | **O(N)** |

The **Difference Array technique** was the key optimization here — instead of updating every element in a range, we mark only the start and end of each range, then take a single prefix sum pass at the end.

> **Reference:** [Programming Techniques — The Difference Array (Medium)](https://medium.com/@nishant_salhotra/programming-techniques-the-difference-array-5cb22aeedf84)

---

## Round 3 — ED/MD Level Interview

This round is typically conducted by a senior person (ED/MD level) at AQR.

### Project Discussion
- Asked about projects in depth
- Focus was on the **idea and motivation** behind the project, not the technical implementation details
- Questions tested the *uniqueness* and *thought process* behind the work

### Math Puzzle
A tricky math puzzle was asked after the project discussion.

### Coding Problem — Design Complex Numbers
Asked to write **actual working code** (not pseudo-code) for a Complex Numbers class.

**What I implemented:**
- A `ComplexNumber` class
- 3–4 core functions (addition, multiplication, etc.)
- Ensured **abstraction** principles were followed (interviewer hinted at flaws; I fixed them)
- Used the class functions to compute given complex number expressions

### HR / Behavioural
- *"Why Software when your major is Electrical Engineering?"*
  - Answered honestly — explored both domains in first year, got involved in software events, interest grew gradually.
- Casual conversation about hostel life and professors (interviewer was an alumnus from the same department).

---

## Key Takeaways

- **Round 3** values *why* you built something over *how*. Be ready to defend the idea behind your projects.
- Be honest about what you haven't studied (e.g., DBMS) — don't list it on your resume if you haven't prepared it.
- **For DSA rounds**, don't try to jump to the optimal solution in one go — think out loud, build gradually, and don't hesitate to take hints from the interviewer. The thought process matters as much as the answer.

---

## Internship Experience

The work environment at AQR is really chill — you can reach out to seniors at any level to discuss ideas and problems without hesitation. People are highly skilled, so there's a lot to learn just by being around them.

**Perks:**
- Excellent food with a lot of variety
- Free protein bars and drinks
- And of course — a really good stipend 💰
