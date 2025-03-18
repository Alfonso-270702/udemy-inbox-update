// SPDX-License-Identifier: MIT
 
pragma solidity 0.8.19;

contract Inbox {
    string public message;

    constructor Inbox(string memory initialMessage)  {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}

