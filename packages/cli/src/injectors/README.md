# Injectors

This section contains all the injectors for the nodetsp CLI.

## What are Injectors here? 🤔

- The concept here is not so similar to NestJS dependency injection. I got the inspiration from it. However, it has a different but simple meaning for our project. It just makes code organization easier and the addition of more options(services) easier.

- Here, an Injector adds a set of files and performs a set of operations to set up any one package/service, such as Git, ESLint, etc., in a nodetsp project.

- This is how I imagine injectors here: an injector is a class which implements the **`Injector`** interface, which logically means that it should contain an `inject` method that does the actual injection of files by calling other methods. Check the `Injector` class.

## Important Points to Remember Before Adding Another Injector ⚠️

- The `base` injector injects basic setup files such as `prettier` files, `package.json`, `tsconfig.json`, etc. It should be run first before any other injector.

- The `git` injector injects Git, i.e., sets up Git, adds a `gitignore` file, and performs the `initial commit` for the project. This injector has to be called (injected) last so that the `initial commit` includes all the files of the project.

- All the user selected options are passed to `runCli()` as props.

## How to add a injector in the project : A Basic Outline 📝

## Steps to Add a New Injector

1. [ ] Create a new folder named after the service to be injected
2. [ ] Create `index.ts` inside the new folder
3. [ ] Create a class with the same name as the folder/injection
4. [ ] Implement the `Injector` interface
5. [ ] Create setup methods for individual operations
6. [ ] Create an `inject()` method that:
   - [ ] Calls setup methods in sequence
   - [ ] Handles the case when user opts out of the service
7. [ ] In `scaffold.ts`:
   - [ ] Create an instance of your injector class
   - [ ] Call its `inject()` method
   - [ ] Do not use if-else for service opt-out handling

> 💡 **Tip**: Check the `git` injector implementation for handling service opt-out cases

> 📝 **Note**: For implementation details and examples of how to properly instantiate and use injectors, refer to the existing injector implementations in the `base` and `git`. These examples as a refrence how can you pass required properties and handle service opt-out cases.
