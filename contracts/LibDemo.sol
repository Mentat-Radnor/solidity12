// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Ext.sol";

contract LibDemo {
  // интеграция библиотеки в свой продукт
  using StrExt for string;
  using ArrayExt for uint[];
  // using { eq } for string;
  function runnerStr(string memory str1, string memory str2) public pure returns(bool) {
    return StrExt.eq(str1, str2);
  }

  function runnerArr(uint[] memory numbers, uint number) public pure returns (bool) {
    return ArrayExt.inArray(numbers, number);
  }
}