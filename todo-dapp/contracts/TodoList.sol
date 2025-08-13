// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Todo {
        uint id;
        string content;
        bool completed;
    }

    mapping(address => Todo[]) private todos;
    mapping(address => uint) public todoCount;
    mapping(address => bool) public registeredUsers;

    event UserRegistered(address user);
    event TodoCreated(uint id, string content, bool completed);
    event TodoToggled(uint id, bool completed);

    modifier onlyRegistered() {
        require(registeredUsers[msg.sender], "User not registered");
        _;
    }

    function register() external {
        require(!registeredUsers[msg.sender], "Already registered");
        registeredUsers[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    function createTodo(string memory _content) external onlyRegistered {
        uint count = todoCount[msg.sender];
        todos[msg.sender].push(Todo(count, _content, false));
        todoCount[msg.sender]++;
        emit TodoCreated(count, _content, false);
    }

    function toggleCompleted(uint _id) external onlyRegistered {
        require(_id < todoCount[msg.sender], "Invalid todo ID");
        todos[msg.sender][_id].completed = !todos[msg.sender][_id].completed;
        emit TodoToggled(_id, todos[msg.sender][_id].completed);
    }

    function getTodos() external view onlyRegistered returns (Todo[] memory) {
        return todos[msg.sender];
    }
}