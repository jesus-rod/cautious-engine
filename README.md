## Introduction

This project uses:

- [NextJS](https://nextjs.org/) ~ React, Typescript, Tailwind
- [Prisma](https://www.prisma.io/orm) as a ORM (Object-Relational Mapping)
  - Currently a SQLite database was chosen for demonstration simplicity but this could be easily changed to another provider under the file [schema.prisma](prisma/schema.prisma)
- [openai-node](https://github.com/openai/openai-node) For interacting with chat GPT
- [vis-networ](https://github.com/visjs/vis-network/) For creating a network graph

## Getting Started

1. After cloning and CDing into the project folder, create a **.env.local** file and add the environment variable for the **OPENAI_API_KEY**

```bash
OPENAI_API_KEY = "your-api-key-here"
```

2. Install npm packages

```bash
npm install
```


3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5. On the homepage (http://localhost:3000) upload a file
6. Click the uploads link or go to http://localhost:3000/uploads
7. Click "Run topic modeling"
8. Click "Show model" to see the network graph

## Architecture

![Architecture Diagram](/public/llm-topic-modelling.png)

## Example Graph

![Example Graph](/public/example-graph.png){width=70%}
