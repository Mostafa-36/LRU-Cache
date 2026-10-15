# LRU Cache — JavaScript

## Overview

A simple implementation of a **Least Recently Used (LRU) Cache** using JavaScript.

The cache stores a limited number of key-value pairs. When the cache reaches its capacity, it evicts the least recently used entry to make room for a new one.

This project focuses on data structures, algorithm efficiency, unit testing, Git, and Docker.

## Features

- Configurable cache capacity.
- Retrieve values using keys.
- Insert new entries and update existing ones.
- Automatically evict the least recently used entry when the cache is full.
- Delete individual entries.
- Clear the cache.
- Track the current number of entries.
- Automated unit tests using Jest.
- Docker support for running the application and tests.

## Data Structures

The implementation uses:

- **Hash Map** to locate cache entries efficiently.
- **Doubly Linked List** to maintain the order of recent usage.

The most recently used entry is kept at the front of the list, while the least recently used entry is kept at the back.

## Technologies

- JavaScript (ES Modules)
- Node.js
- Jest
- Docker

## Getting Started

### Prerequisites

- Node.js and npm
- Docker (optional, for containerized execution)

### Installation

Clone the repository or download the project, then navigate to its directory.

Install dependencies:

```bash
npm ci
```

### Run the application

```bash
npm start
```

This runs the demonstration in `src/app.js`.

### Run tests

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage:

```bash
npm run test:coverage
```

## Docker

### Build the image

```bash
docker build -t lru-cache .
```

### Run the application

```bash
docker run --rm lru-cache
```

### Run tests inside the container

```bash
docker run --rm lru-cache npm test
```

## Project Structure

```text
LRU-Cache/
├── src/
│   ├── CacheNode.js
│   ├── DoublyLinkedList.js
│   ├── LRUCache.js
│   └── app.js
├── test/
│   ├── DoublyLinkedList.test.js
│   └── LRUCache.test.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## Testing

The project uses Jest for automated unit testing.

The test suites cover the doubly linked list and LRU cache behavior. The current test suite contains 23 passing tests.

## Learning Objectives

- Understand the LRU eviction policy.
- Practice combining a hash map with a doubly linked list.
- Implement and test data structures in JavaScript.
- Use Git to track changes.
- Package and run a Node.js application with Docker.
