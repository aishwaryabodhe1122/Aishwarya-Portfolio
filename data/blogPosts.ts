export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  coverImage: string
  readingTime: number
  featured: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Microservices with Node.js and Docker',
    slug: 'building-scalable-microservices-nodejs-docker',
    excerpt: 'Learn how to architect and deploy production-ready microservices using Node.js, Express, and Docker containers with best practices for scalability.',
    content: `# Building Scalable Microservices with Node.js and Docker

## Introduction

Microservices architecture has become the de facto standard for building modern, scalable applications. In this comprehensive guide, we'll explore how to build production-ready microservices using Node.js and Docker.

## Why Microservices?

Microservices offer several advantages:

- **Scalability**: Scale individual services independently
- **Flexibility**: Use different technologies for different services
- **Resilience**: Failure in one service doesn't bring down the entire system
- **Faster Development**: Teams can work on services independently

## Setting Up Your Environment

First, ensure you have the following installed:

\`\`\`bash
node --version  # v18.0.0 or higher
docker --version  # Docker version 20.10.0 or higher
\`\`\`

## Creating a Microservice

Let's create a simple user service:

\`\`\`javascript
// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/users', async (req, res) => {
  // Fetch users from database
  res.json({ users: [] });
});

app.listen(PORT, () => {
  console.log(\`User service running on port \${PORT}\`);
});
\`\`\`

## Dockerizing the Service

Create a \`Dockerfile\`:

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Docker Compose for Multiple Services

\`\`\`yaml
version: '3.8'
services:
  user-service:
    build: ./user-service
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/users
  
  product-service:
    build: ./product-service
    ports:
      - "3002:3000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/products
  
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
\`\`\`

## Best Practices

1. **API Gateway**: Use an API gateway to route requests
2. **Service Discovery**: Implement service discovery for dynamic environments
3. **Health Checks**: Always include health check endpoints
4. **Logging**: Centralized logging with tools like ELK stack
5. **Monitoring**: Use Prometheus and Grafana for monitoring

## Conclusion

Building microservices with Node.js and Docker provides a robust foundation for scalable applications. Start small, iterate, and scale as needed.

Happy coding! 🚀`,
    author: {
      name: 'Aishwarya Bodhe',
      avatar: '/images/avatar.jpg'
    },
    publishedAt: '2024-01-15',
    category: 'Backend Development',
    tags: ['Node.js', 'Docker', 'Microservices', 'DevOps'],
    coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=600&fit=crop',
    readingTime: 8,
    featured: true
  },
  {
    id: '2',
    title: 'Mastering React Hooks: A Complete Guide',
    slug: 'mastering-react-hooks-complete-guide',
    excerpt: 'Deep dive into React Hooks with practical examples, custom hooks, and performance optimization techniques for modern React applications.',
    content: `# Mastering React Hooks: A Complete Guide

## Introduction

React Hooks revolutionized how we write React components. Let's explore the most important hooks and how to use them effectively.

## useState Hook

The most basic hook for managing state:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

Handle side effects in your components:

\`\`\`jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
    }
    
    fetchUser();
  }, [userId]); // Re-run when userId changes
  
  return <div>{user?.name}</div>;
}
\`\`\`

## Custom Hooks

Create reusable logic:

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
\`\`\`

## useCallback and useMemo

Optimize performance:

\`\`\`jsx
import { useCallback, useMemo } from 'react';

function ExpensiveComponent({ items, onItemClick }) {
  // Memoize expensive calculations
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);
  
  // Memoize callback functions
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);
  
  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

## Best Practices

1. **Rules of Hooks**: Only call hooks at the top level
2. **Dependency Arrays**: Always specify dependencies correctly
3. **Custom Hooks**: Extract reusable logic
4. **Performance**: Use useMemo and useCallback wisely
5. **Cleanup**: Return cleanup functions from useEffect

## Conclusion

React Hooks provide a powerful way to write cleaner, more maintainable code. Practice these patterns and you'll become a React expert!`,
    author: {
      name: 'Aishwarya Bodhe',
      avatar: '/images/avatar.jpg'
    },
    publishedAt: '2024-01-10',
    category: 'Frontend Development',
    tags: ['React', 'JavaScript', 'Hooks', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
    readingTime: 10,
    featured: true
  },
  {
    id: '3',
    title: 'AI/ML in Production: Lessons Learned',
    slug: 'ai-ml-production-lessons-learned',
    excerpt: 'Real-world insights from deploying machine learning models to production, including MLOps best practices and common pitfalls to avoid.',
    content: `# AI/ML in Production: Lessons Learned

## Introduction

Deploying machine learning models to production is vastly different from training them in notebooks. Here are key lessons from real-world ML deployments.

## Model Versioning

Always version your models:

\`\`\`python
import mlflow

# Track experiments
with mlflow.start_run():
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_metric("accuracy", 0.95)
    mlflow.sklearn.log_model(model, "model")
\`\`\`

## Data Validation

Validate input data before predictions:

\`\`\`python
from pydantic import BaseModel, validator

class PredictionInput(BaseModel):
    feature1: float
    feature2: float
    feature3: int
    
    @validator('feature1', 'feature2')
    def check_range(cls, v):
        if not 0 <= v <= 100:
            raise ValueError('Value must be between 0 and 100')
        return v
\`\`\`

## Model Serving with FastAPI

\`\`\`python
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load('model.pkl')

@app.post("/predict")
async def predict(input_data: PredictionInput):
    features = [[input_data.feature1, input_data.feature2, input_data.feature3]]
    prediction = model.predict(features)
    return {"prediction": prediction[0]}
\`\`\`

## Monitoring

Monitor model performance in production:

- **Data Drift**: Track input distribution changes
- **Model Drift**: Monitor prediction accuracy over time
- **Latency**: Ensure fast response times
- **Resource Usage**: CPU, memory, GPU utilization

## A/B Testing

Test new models safely:

\`\`\`python
import random

def get_model_version(user_id):
    # Route 10% of traffic to new model
    if hash(user_id) % 10 == 0:
        return "model_v2"
    return "model_v1"
\`\`\`

## Key Takeaways

1. **Start Simple**: Deploy a simple model first
2. **Monitor Everything**: Logs, metrics, alerts
3. **Automate**: CI/CD for ML models
4. **Version Control**: Code, data, and models
5. **Feedback Loop**: Collect production data for retraining

## Conclusion

Production ML is an engineering challenge. Focus on reliability, monitoring, and continuous improvement.`,
    author: {
      name: 'Aishwarya Bodhe',
      avatar: '/images/avatar.jpg'
    },
    publishedAt: '2024-01-05',
    category: 'AI & Machine Learning',
    tags: ['AI', 'Machine Learning', 'MLOps', 'Python'],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
    readingTime: 12,
    featured: false
  },
  {
    id: '4',
    title: 'TypeScript Best Practices for Large-Scale Applications',
    slug: 'typescript-best-practices-large-scale',
    excerpt: 'Essential TypeScript patterns and practices for building maintainable, type-safe applications at scale.',
    content: `# TypeScript Best Practices for Large-Scale Applications

## Introduction

TypeScript brings type safety to JavaScript, but using it effectively requires following best practices.

## Strict Mode

Always enable strict mode:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
\`\`\`

## Type Inference

Let TypeScript infer types when possible:

\`\`\`typescript
// Good
const user = {
  name: 'John',
  age: 30
};

// Avoid unnecessary type annotations
const name: string = 'John'; // Redundant
const name = 'John'; // Better
\`\`\`

## Utility Types

Use built-in utility types:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude properties
type UserWithoutEmail = Omit<User, 'email'>;

// Readonly - make immutable
type ReadonlyUser = Readonly<User>;
\`\`\`

## Generics

Create reusable, type-safe functions:

\`\`\`typescript
function asyncWrapper<T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> {
  return promise
    .then(data => [data, null] as [T, null])
    .catch(err => [null, err] as [null, Error]);
}

// Usage
const [data, error] = await asyncWrapper(fetchUser());
\`\`\`

## Discriminated Unions

Handle different states safely:

\`\`\`typescript
type LoadingState = { status: 'loading' };
type SuccessState<T> = { status: 'success'; data: T };
type ErrorState = { status: 'error'; error: string };

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return state.data; // TypeScript knows data exists
    case 'error':
      return state.error; // TypeScript knows error exists
  }
}
\`\`\`

## Best Practices

1. **Avoid \`any\`**: Use \`unknown\` instead
2. **Use Enums Wisely**: Consider string literal unions
3. **Type Guards**: Create custom type guards
4. **Organize Types**: Keep types close to usage
5. **Documentation**: Use JSDoc for complex types

## Conclusion

TypeScript is powerful when used correctly. Follow these practices to build robust, maintainable applications.`,
    author: {
      name: 'Aishwarya Bodhe',
      avatar: '/images/avatar.jpg'
    },
    publishedAt: '2023-12-28',
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Best Practices', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
    readingTime: 9,
    featured: false
  }
]

export const categories = [
  'All',
  'Frontend Development',
  'Backend Development',
  'AI & Machine Learning',
  'Programming',
  'DevOps',
  'Web Development'
]

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug)
}

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'All') return blogPosts
  return blogPosts.filter(post => post.category === category)
}

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag))
}

export const searchBlogPosts = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase()
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
