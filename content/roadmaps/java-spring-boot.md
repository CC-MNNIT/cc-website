+++
title = "Java & Spring Boot Roadmap"
weight = 2
description = "A comprehensive, practical guide to mastering Java backend development: modern Java, Spring Boot, REST APIs, Spring Data JPA, security, testing, and production engineering."

[extra]
difficulty = "Beginner to Advanced"
estimated_time = "Ongoing Practice (3-4 months for core foundation)"
prerequisites = "Basic programming fundamentals in any language; logical thinking"
badge = "BACKEND"
toc_expand = true

# Landing page carousel
carousel_image = "roadmaps/java-spring-boot-cyber.webp"
carousel_title = "Java & Spring Boot"
carousel_description = "Master enterprise backend development with Java 21, Spring Boot 3, REST APIs, JPA, and Spring Security."
+++

## 1. Overview

### What is Java Backend Development?

Java backend development powers the server-side infrastructure of modern applications. It orchestrates business logic, handles data persistence with relational and NoSQL databases, exposes robust RESTful APIs, enforces authentication and role-based authorization, and integrates external services.

### Why Java + Spring Boot?

* **Industry Dominance**: Java remains the backbone of enterprise software, financial institutions, high-volume e-commerce platforms, and mission-critical cloud backends.
* **Modern Java Is a Different Language**: Java 25 LTS (the current LTS, alongside 21) brings virtual threads for cheap concurrency, records, pattern matching, and sealed types — the verbosity jokes are two decades out of date.
* **Strong Foundations**: Java enforces object-oriented design, strong static typing, robust memory management, and mature concurrency models.
* **Spring Boot Ecosystem**: Spring Boot strips away complex XML boilerplate, providing opinionated defaults, embedded servers (Tomcat/Jetty), auto-configuration, and production-grade monitoring right out of the box.
* **Long-Term Scalability**: The exact same paradigms learned building a student project scale to distributed microservice architectures handling millions of requests per second.

### Real-Life Applications

* **Banking & Fintech**: High-concurrency transaction processing, fraud detection, and regulatory ledger systems.
* **E-commerce**: Product catalog caching, order processing, and payment gateway integrations (Amazon, Flipkart).
* **Enterprise SaaS**: Multi-tenant cloud applications, CRM platforms, and workflow automation.
* **Streaming & Media**: Content metadata management, user session tracking, and notification microservices.

### Recommended Tooling (Zero-Friction Setup)

* **IDE**: **IntelliJ IDEA Community Edition** (100% free) — the undisputed industry standard for Java with out-of-the-box refactoring and debugging.
* **JDK**: **Java 25 LTS** (current) or Java 21 LTS from **Adoptium (Eclipse Temurin)** or Amazon Corretto (manage via SDKMAN! on Linux/macOS).
* **API Testing**: **Postman** or **Bruno** for testing endpoints and inspecting JSON responses.
* **Database**: **PostgreSQL** (run via Docker Compose to avoid manual local service issues).
* **Build Tool Note**: This roadmap uses **Maven** — the enterprise incumbent. **Gradle** is the equally-valid alternative (Kotlin-based build scripts, faster incremental builds); concepts transfer 1:1.

---

## 2. Learning Path Breakdown

### Stage 1 — Modern Core Java
**Duration**: 2–3 weeks  
**Objective**: Build solid programming muscle memory and master Object-Oriented Programming (OOP) using modern Java (Java 17 / 21 LTS).

#### You Learn
* **Java Basics**:
  * Variables, primitive vs reference types, operators, and control flow (`switch` expressions, loops).
  * Methods, method overloading, arrays, and string immutability (`String`, `StringBuilder`).
  * Scanner and command-line I/O.
* **Object-Oriented Programming (OOP)**:
  * Classes, objects, memory layout (Stack vs Heap).
  * Constructors, `this` and `super` keywords.
  * The Four Pillars: **Encapsulation**, **Inheritance**, **Polymorphism**, and **Abstraction**.
  * Abstract classes vs Interfaces (default and static methods in interfaces).
* **Essential Java Concepts**:
  * Exception Handling: Checked vs Unchecked exceptions, `try-catch-finally`, and `try-with-resources`.
  * The Java Collections Framework: `List` (`ArrayList`), `Set` (`HashSet`), `Map` (`HashMap`), and iteration patterns.
  * Overriding `equals()` and `hashCode()` contracts.
  * Generics basics (`List<T>`).
  * Functional interfaces, Lambda expressions, and the Streams API (`filter`, `map`, `collect`).
  * Java Records (clean immutable data carriers).

#### Hands-On Tasks
1. **Student Record System**: Build a CLI app allowing users to add, update, remove, and search students stored in an in-memory `HashMap` or `ArrayList`.
2. **Personal Expense Tracker**: Create a console application to log expenses, group them by category using Streams (`Collectors.groupingBy`), and compute weekly/monthly summaries.

#### Modern Java in Practice
```java
// Records: immutable data carriers — perfect for DTOs and value objects
record Contributor(String username, int commits, boolean isCoreTeam) {}

// Streams: declarative data pipelines over collections
List<String> topContributors = contributors.stream()
    .filter(c -> c.commits() > 50)
    .sorted(Comparator.comparingInt(Contributor::commits).reversed())
    .map(Contributor::username)
    .limit(5)
    .toList();
```

#### Virtual Threads: The Java 21+/25 Superpower for Backends

```java
// Virtual threads make blocking I/O cheap — 10,000 concurrent tasks, no
// reactive complexity, no thread-pool tuning. This is why modern Java
// backends no longer need WebFlux for high-concurrency I/O.
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i ->
        executor.submit(() -> fetchFromDownstream(i)));
}
```

#### Curated Resources

{{<pretty_link url="https://dev.java/learn/" title="Dev.java — Official Learn Java Portal" description="The official Java learning portal from Oracle, covering modern Java end to end." />}}

{{<pretty_link url="https://java-programming.mooc.fi/" title="University of Helsinki — MOOC.fi Java Programming I & II" description="University-grade Java course with hands-on automated exercise tests — free and certificate-track." />}}

{% <collapse title="Video Courses (English & Hindi)"> %}
* **Kunal Kushwaha** — Java & DSA fundamentals.
* **Telusko** — Core Java course.
* **Shrayansh Jain** — Java core to advanced playlist.
{% </collapse> %}

---

### Stage 2 — Backend Fundamentals (SQL, HTTP & Maven)
**Duration**: 1–2 weeks  
**Objective**: Understand the protocols and data stores bridging clients, servers, and databases before introducing framework abstractions.

#### You Learn
* **Relational Databases & SQL**:
  * Tables, columns, constraints, Primary Keys, and Foreign Keys.
  * CRUD queries: `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
  * Joins: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`.
  * Indexing fundamentals and database normalization (1NF, 2NF, 3NF).
  * Choose **PostgreSQL** or **MySQL**.
* **HTTP & REST Principles**:
  * Client-Server architecture and the request/response lifecycle.
  * HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
  * Status codes: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`.
  * Headers, query parameters, path variables, and JSON request/response bodies.
* **Build Systems (Maven)**:
  * Purpose of a build automation tool.
  * Understanding `pom.xml`, project coordinates (`groupId`, `artifactId`, `version`).
  * Managing dependencies and plugins.
  * Maven lifecycle: `clean`, `compile`, `test`, `package`, `install`.

#### Hands-On Tasks
1. **Database Schema Design**: Model a normalized relational schema for a college management portal (Students, Courses, Enrollments, Grades) with Foreign Key constraints.
2. **Raw SQL Scripting**: Write queries to fetch student enrollments, average grades per course, and find unassigned courses using `LEFT JOIN`.
3. **Maven Project Setup**: Generate a clean Maven project from scratch and import third-party libraries (e.g., Jackson or Apache Commons) to practice dependency management.

#### Curated Resources

{{<pretty_link url="https://sqlbolt.com/" title="SQLBolt — Interactive SQL Practice" description="Learn SQL by writing queries in the browser, lesson by lesson." />}}

{{<pretty_link url="https://www.postgresql.org/docs/" title="PostgreSQL Official Documentation" description="The authoritative reference for the default relational database in modern backends." />}}

{{<pretty_link url="https://maven.apache.org/guides/getting-started/index.html" title="Apache Maven — Getting Started" description="Official guide to the build lifecycle, POM structure, and dependency management." />}}

---

### Stage 3 — Spring Boot 3 Development
**Duration**: 3–4 weeks  
**Objective**: Build production-grade, secure, and well-structured REST APIs using modern Spring Boot 3.x and Java 17+.

#### Part 1: Core Spring & Inversion of Control (IoC)
* Spring ApplicationContext and Inversion of Control (IoC).
* Dependency Injection (DI) with constructor injection (avoid field injection).
* Key annotations: `@SpringBootApplication`, `@Component`, `@Service`, `@Repository`, `@Configuration`, `@Bean`.
* Bootstrapping projects cleanly via [start.spring.io](https://start.spring.io).

#### Part 2: REST APIs & Layered Architecture
* Building endpoints: `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`.
* Reading data: `@PathVariable`, `@RequestParam`, `@RequestBody`, `@RequestHeader`.
* Response handling: `ResponseEntity<T>`, status codes, and HTTP headers.
* **Strict Layer Separation**:
  {% <mermaid> %}
  graph LR
      C["Controller<br/>(HTTP / DTO)"] --> S["Service<br/>(Business Logic)"]
      S --> R["Repository<br/>(Data Access)"]
      R --> DB[("Database")]
  {% </mermaid> %}
* The **DTO Pattern**: Decoupling database `@Entity` models from API request/response payloads to prevent mass assignment and circular JSON serialization bugs.

The shape of almost every Spring controller you will write:

```java
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService service; // constructor injection — never field injection

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public Page<ProjectDto> list(@RequestParam(defaultValue = "0") int page) {
        return service.findAll(PageRequest.of(page, 20));
    }

    @PostMapping
    public ResponseEntity<ProjectDto> create(@Valid @RequestBody CreateProjectRequest request) {
        ProjectDto created = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
```

#### Part 3: Database Integration with Spring Data JPA
* What is an ORM? Understanding JPA specifications vs Hibernate implementation.
* Entities and annotations: `@Entity`, `@Id`, `@GeneratedValue`, `@Column`, `@Table`.
* Relationships: `@OneToMany`, `@ManyToOne`, `@ManyToMany`, and cascade types.
* `JpaRepository<T, ID>`: Out-of-the-box CRUD methods, custom query methods (`findByEmail`), and `@Query` (JPQL / native SQL).
* Connection pools (HikariCP) and configuring `application.properties` / `application.yml`.

#### Part 4: Validation & Global Exception Handling
* Jakarta Bean Validation: `@Valid`, `@NotNull`, `@NotBlank`, `@Size`, `@Min`, `@Email`.
* Centralized error handling: `@RestControllerAdvice` and `@ExceptionHandler`.
* Crafting uniform error response payloads containing timestamps, HTTP status, and descriptive error messages.

#### Part 5: Security & JWT Authentication
* Authentication vs Authorization.
* Modern Spring Security 6 architecture using `@Bean SecurityFilterChain` and lambda DSL.
* Password hashing using `BCryptPasswordEncoder`.
* Stateless session management and JSON Web Tokens (JWT).
* Custom `OncePerRequestFilter` to validate Bearer tokens on incoming requests.
* Role-based access control (RBAC): `@PreAuthorize("hasRole('ADMIN')")`.

The modern Spring Security 6 configuration you will actually write:

```java
@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable()) // acceptable for stateless JWT APIs
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated())
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}
```

#### Part 6: Automated Testing & API Documentation
* Unit testing `@Service` classes with **JUnit 5** and **Mockito** (`@Mock`, `@InjectMocks`, `when().thenReturn()`).
* Interactive API documentation using **SpringDoc OpenAPI** (Swagger UI at `/swagger-ui.html`).
* Local database containerization with **Docker Compose** — and **Testcontainers** to run throwaway PostgreSQL instances *inside* your integration tests, so tests hit a real database without polluting shared state.

#### Part 7: Production Essentials
* **Spring Boot Actuator**: production-ready `/health`, `/metrics`, and `/env` endpoints — the observability hook your monitoring stack scrapes.
* **Flyway migrations**: database schema changes as versioned, ordered SQL files applied at startup — never hand-edited schemas.
* **Profiles**: `application-dev.yml` vs `application-prod.yml` — environment-specific configuration without code changes.
* **Caching**: Spring's `@Cacheable` backed by Redis when read-heavy endpoints outgrow the database.

#### Hands-On Tasks
1. **Student API**: Build full CRUD endpoints with DTO validation, JPA persistence, and global exception handling.
2. **College Event Portal API**: Implement event creation, attendee registration, capacity checks, and enrollment status.
3. **JWT Auth Microservice**: Secure endpoints with user registration, login returning JWT tokens, and role-guarded routes (`ROLE_STUDENT` vs `ROLE_ORGANIZER`).
4. **Interactive Swagger**: Document all endpoints with SpringDoc OpenAPI.

#### Curated Resources

{{<pretty_link url="https://start.spring.io/" title="Spring Initializr" description="Bootstrap a configured Spring Boot project in seconds — dependencies included." />}}

{{<pretty_link url="https://docs.spring.io/spring-boot/" title="Official Spring Boot Documentation" description="The definitive reference for auto-configuration, starters, and production features." />}}

{{<pretty_link url="https://docs.spring.io/spring-security/reference/" title="Official Spring Security Reference" description="The authoritative guide to filters, authentication, and authorization architecture." />}}

{{<pretty_link url="https://spring.io/guides" title="Official Spring Guides" description="Task-oriented, 15-minute guides for practically every Spring capability." />}}

{{<pretty_link url="https://www.baeldung.com/" title="Baeldung — Spring & Java Reference" description="The community's deep-dive reference for every Spring question you will ever Google." />}}

{% <collapse title="Video Courses (English & Hindi)"> %}
* **Dan Vega** — Modern Spring Boot 3 from a Spring team advocate.
* **Laurentiu Spilca** — Spring Context and Security deep dives.
* **Amigoscode** — Spring Boot, Docker, and PostgreSQL.
* **Telusko** — Spring Boot full course.
* **Shrayansh Jain** — Spring Boot playlist (Hindi-friendly).
* **EmbarkX** — Spring Boot project walkthroughs.
{% </collapse> %}

---

## 3. The Milestone Ladder

Each stage's hands-on tasks form a progressive ladder — every rung is a deployable, portfolio-ready artifact:

{% <mermaid> %}
graph TD
    M1["Milestone 1: CLI Data Applications<br/>(OOP, Collections, Streams)"] --> M2["Milestone 2: Schema &amp; SQL Mastery<br/>(Normalized Design, Joins)"]
    M2 --> M3["Milestone 3: Student API<br/>(Spring Boot, JPA, Validation)"]
    M3 --> M4["Milestone 4: JWT Auth Microservice<br/>(Spring Security 6, RBAC)"]
    M4 --> M5["Milestone 5: Tested &amp; Documented API<br/>(Mockito, Testcontainers, Swagger)"]
    M5 --> M6["Milestone 6 (Capstone): Campus Event Platform<br/>(Everything Above, Production-Grade)"]
{% </mermaid> %}

---

## 4. Capstone Project: Campus Event & Management Platform

Rather than building fragmented tutorial snippets, consolidate your skills into one comprehensive, portfolio-ready application.

### Recommended Tech Stack
* **Language & Runtime**: Java 21 LTS
* **Framework**: Spring Boot 3.x
* **Security**: Spring Security 6 + JWT
* **Database**: PostgreSQL with Spring Data JPA & Hibernate
* **Containerization**: Docker Compose (for PostgreSQL)
* **Documentation**: SpringDoc OpenAPI (Swagger UI)
* **Testing**: JUnit 5 + Mockito

### Key Features to Implement
* **Authentication & Authorization**: Registration and login endpoints returning signed JWTs, password encryption with BCrypt, and role-based permissions (`ROLE_STUDENT`, `ROLE_ADMIN`).
* **Entity Relationships**: Normalized database models linking Users ↔ Events ↔ Registrations with proper cascading and indexing.
* **Pagination & Sorting**: Paginated event listings (`Pageable`, `Page<EventDTO>`) with multi-attribute filtering (category, date, venue).
* **Robust Validation**: Jakarta validation on all incoming request payloads with meaningful field error mappings.
* **Global Error Handling**: `@RestControllerAdvice` catching custom business exceptions (`ResourceNotFoundException`, `EventFullException`) and returning standard RFC 7807 problem details.
* **Automated Test Suite**: Unit tests covering service business rules with at least 70% branch coverage.
* **Swagger API UI**: Interactive documentation accessible at `/swagger-ui.html`.

---

## 5. Skills Checklist for Campus Placements & Internships

Before applying for backend software engineering roles, ensure you can comfortably discuss and demonstrate:

* [ ] Modern Java features: Lambdas, Streams, Records, and modern `switch`.
* [ ] The difference between checked and unchecked exceptions.
* [ ] Internal workings of `HashMap` (`hashCode()` and `equals()`, buckets, and collisions).
* [ ] Relational schema design, Foreign Keys, indexing, and SQL Joins.
* [ ] Spring Boot Inversion of Control (IoC), Beans, and Constructor Injection.
* [ ] Controller → Service → Repository architectural pattern.
* [ ] The DTO pattern and why JPA Entities must never be leaked through the API layer.
* [ ] Spring Data JPA derived queries and resolving the N+1 select problem.
* [ ] Spring Security 6 `SecurityFilterChain` and stateless JWT lifecycle.
* [ ] Writing unit tests with Mockito and JUnit 5.
* [ ] Containerizing dependencies using `docker-compose.yml`.

---

## 6. Where to Next in the CC Ecosystem

Java backend engineering connects to the rest of the CC curriculum depending on your direction:

* **[DevOps Roadmap](@/roadmaps/devops.md)** — containerize, pipeline, and deploy your Spring Boot services with Docker, GitHub Actions, and Kubernetes.
* **[Web Development Master Roadmap](@/roadmaps/web-development.md)** — pair your backend APIs with modern frontend engineering, or compare Node.js/Python backends against the JVM.
* **[System Administration Roadmap](@/roadmaps/sysadmin.md)** — the Linux, networking, and security foundations your JVM services run on.
* **[Open Source Contribution Roadmap](@/roadmaps/open-source.md)** — Spring, Hibernate, and the wider JVM ecosystem are among the largest open-source communities in the world.
