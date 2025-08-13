const TodoList = artifacts.require("TodoList");

contract("TodoList", (accounts) => {
  let todoList;
  
  beforeEach(async () => {
    todoList = await TodoList.new();
    await todoList.register({ from: accounts[0] });
  });

  it("should register a new user", async () => {
    const isRegistered = await todoList.registeredUsers(accounts[0]);
    assert.equal(isRegistered, true);
  });

  it("should create a new todo", async () => {
    await todoList.createTodo("Buy milk", { from: accounts[0] });
    const todoCount = await todoList.todoCount(accounts[0]);
    assert.equal(todoCount, 1);
  });

  it("should toggle todo completion", async () => {
    await todoList.createTodo("Buy milk", { from: accounts[0] });
    await todoList.toggleCompleted(0, { from: accounts[0] });
    const todos = await todoList.getTodos({ from: accounts[0] });
    assert.equal(todos[0].completed, true);
  });
});