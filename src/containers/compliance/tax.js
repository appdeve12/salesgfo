// pages/compliance/TaxCompliance.js
import { Card, Typography, Form, Input, Button } from 'antd';

const { Title, Paragraph } = Typography;

const TaxCompliance = () => (
  <Card>
    <Title level={4}>Tax Compliance Settings</Title>
    <Paragraph>
      Ensure your PAN and tax details are correctly linked for income tax compliance and TDS reporting.
    </Paragraph>
    <Form layout="vertical">
      <Form.Item label="PAN Number" name="pan" rules={[{ required: true }]}>
        <Input style={{ maxWidth: 400 }} />
      </Form.Item>
      <Form.Item label="GSTIN" name="gstin">
        <Input style={{ maxWidth: 400 }} />
      </Form.Item>
      <Form.Item>
        <Button className='custumcss textwhite'>

{/* 
          <!-- //first at sartia global
//what is nodejs,
what are the main features of nodejs,
 what are event loop,
  if nodejs is sinle threder how it handles concurrecy,
  what is asyncronous and syncronous
  why we used nodejs overother language
  what is event driven arctitcture
  what are the mmodules in nodejs
  what are package.json,package.lock.json,
  what are npm
  what are file modules (syncronous vs asyncronous)
  what are path modules,
  what are url modules
  what are os modules
  what are http module create server with http,what is the diffrence between httpvs https
  what are event module
  what is type module and default module
  what is micro vs macro
  what is cluster
  what is buffer
  what is repl something lke
  what is setimmediate and process.nexttick,settimeout,setinterval
  what is promises and its all types
  what is async await
  what is streaming
  what is callback
  what are global objects
what is  CommonJS vs ES Modules
what is require() vs import
what is Creating custom modules
what is package.json and its fields
what is Semantic Versioning (semver)
NPM vs Yarn
what is Dependency types: dependencies, devDependencies, peerDependencies
whta is crypto
what is child_process
what is zlib
what is Reading and writing files (sync vs async)

what is Working with directories

what is Streams for large files

what are Handling file paths
what are Environment variables (dotenv)

what are Input validation and sanitization

what are CORS

what are HTTPS

what are Helmet middleware

what are Rate limiting

what is Authentication & Authorization
what is EventEmitter class

what are Streams (Readable, Writable, Duplex, Transform)

what are Buffer manipulation

what is Worker Threads

what is Clustering and load balancing

what are Real-time communication (WebSockets with socket.io)

what are Performance tuning
Environment configuration (dotenv)

PM2 for process management

Dockerizing a Node.js app

CI/CD basics

Reverse proxy with Nginx

1. Core Node.js Concepts

 What is Node.js?
Node.js is a runtime environment that lets you run JavaScript outside the browser (on the server).

It is built on the Google Chrome V8 engine (fast JavaScript execution).
Asynchronous & Non-blocking I/O: Handles multiple operations without waiting.
✅ Event-driven architecture: Uses events & callbacks to manage tasks.
✅ Single-threaded model: Executes JavaScript code in a single thread but uses background threads for I/O.
✅ Cross-platform: Runs on Windows, Linux, macOS.
✅ Fast execution: Thanks to the V8 engine.
✅ Open-source: Free and maintained by a strong community.
 Why use Node.js over other languages?

 Event-driven architecture

 Synchronous vs Asynchronous

 What is the Event Loop?

 If Node.js is single-threaded, how does it handle concurrency?

 Microtask vs Macrotask queue

 What is callback?

 What is async/await?

 What are Promises and types of Promises?

 What is streaming?

 What are global objects?

📦 2. Modules & Packages

 What are Node.js modules?

 Built-in modules: fs, path, url, os, http, crypto, zlib, events, child_process

 File module: sync vs async

 Path module

 URL module

 OS module

 HTTP module: creating a server

 HTTP vs HTTPS

 Event module and EventEmitter class

 What is a custom module?

 What is CommonJS vs ES Modules?

 What is require() vs import?

 What is type: "module"?

 What is the crypto module?

 What is child_process?

 What is zlib?

📁 3. File System Operations

 Reading and writing files (sync vs async)

 Working with directories

 Handling file paths

 Streams for large files

 Buffer and buffer manipulation

🧩 4. NPM & Dependency Management

 What is package.json and its fields?

 What is package-lock.json?

 What is NPM?

 NPM vs Yarn

 What is Semantic Versioning (semver)?

 Dependency types:

 dependencies

 devDependencies

 peerDependencies

🔐 5. Security & Config

 Environment variables (dotenv)

 Input validation and sanitization

 CORS

 HTTPS

 Helmet middleware

 Rate limiting

 Authentication vs Authorization

🧠 6. Advanced Node.js

 What is Cluster module?

 Worker Threads

 Clustering and load balancing

 REPL (Read-Eval-Print Loop)

 setImmediate, process.nextTick, setTimeout, setInterval

🌐 7. Networking & Real-Time

 HTTP server with native http module

 Real-time communication (WebSockets with socket.io)

🛠️ 8. Deployment & Tools

 Environment configuration (dotenv)

 PM2 process manager

 Dockerizing a Node.js app

 CI/CD basics

 Reverse proxy with Nginx */}
   {/* --> */}
        </Button>
      </Form.Item>
    </Form>
  </Card>
);

export default TaxCompliance;
