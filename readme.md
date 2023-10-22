# Minishop excercise for Store Tech

This repository contains both Web (React) and Mobile (React Native) clients and server for Minishop excercise.

They currently include some of the expected functionality, but you are free to rewrite, replace or reconfigure anything found in this repository as long as your solution matches the given assignment.

## Architecture / Folder Structure

In order to run this project locally, please read the documentation in each and every folder

```
+ client
|-- web (React)
  |-- src
|-- mobile (React Native)
  |-- src
+ schema (GraphQL)
+ server (Apollo)
|-- src
```
## Assignment's Notes
* I was planning to use hook for mobile and redux for web, but due to the cohesion of the codebase, I use Context Hook for both and there is an extra redux folder in web repository.
* I fixed the todo in server repository
* I used yarn instead of npm