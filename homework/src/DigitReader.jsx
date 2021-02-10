import React, { useState,useEffect} from 'react'
import text from './text/test.js'
import "./style/DigitReader.css"

function DigitReader(props) {
    const [accountNumbers,setAccountNumbers] = useState();
    const [rawCharacter] = useState(props.raw)
    const DIGIT_WIDTH = 3;
    const BACKSLASH = "\\"
    const [isLoading,setIsLoading] = useState(true);

    var accountNumDict = {
    [ " _ " +
      "| |" +
      "|_|"
    ] : "0" ,
    [
      "   " +
      "  |" +
      "  |"
    ] : "1",
    [
      " _ " +
      " _|" +
      "|_ "
    ] : "2",
    [
    " _ " +
    " _|" +
    " _|"
  ] : "3",
  [
    "   " +
    "|_|" +
    "  |"
  ] : "4",
  [
    " _ " +
    "|_ " +
    " _|"
  ] : "5",
  [
    " _ " +
    "|_ " +
    "|_|"
  ] : "6",
  [
    " _ " +
    "  |" +
    "  |"
  ] : "7",
  [
    " _ " +
    "|_|" +
    "|_|"
  ] : "8",
  [
    " _ " +
    "|_|" +
    " _|"
  ] : "9" ,
  [ " _ "+
    "|_|"+
    "| |"] : "10",
  [ " _ "+
    `|_${BACKSLASH}` +
    "|_/"] : "11",

  [ " _ "+
    "|  "+
    "|_ "] : "12",
    
  [ " _ " +
    `| ${BACKSLASH}` +
    "|_/"] : "13",
  [ " _ "+
    "|_ "+
    "|_ "] : "14",
  [ "  _"+
    " |_"+
    " | "] : "15",
    }

    //This function is responsible for turning the digits to actual numbers
    const readFile =  ()=>{
        let parsedAccount = "";
        for (let digitPlace = 0; digitPlace < 9; digitPlace++) {
          parsedAccount += accountNumDict[convertingDigitToNum(digitPlace, rawCharacter)] || "?"
        }
      return parsedAccount;
    }

    //This function returns the digits one by one
    function convertingDigitToNum(position, accountText) {
      var accountLines = accountText.split("\n");
      var oneRawDigit = "";
      [0,1,2].forEach(function(lineNum) {
         var start = position * DIGIT_WIDTH;
         var end = (position + 1) * DIGIT_WIDTH;
         oneRawDigit += accountLines[lineNum].slice(start, end);
      });
    
      return oneRawDigit;
    };

    //This functions is checking if the account number is correct
    function checksum(accNumber){
      if(accNumber.includes("?")){
        return false
      }
      else{
        let sum = 0;
        for(let n in accNumber){
          sum += Number(accNumber[n])
        }
        return sum%11 ===0 
    }
    
  }
  //this function returns all the alternative solution for the digits
    function checkMissingPipes(incommingRawDigit){
      var alternates = [];
      Object.keys(accountNumDict).forEach(function(rawDigit) {
        var diffCount = 0;
        for(var i = 0; i < rawDigit.length; i++) {
          if(incommingRawDigit.substr(i, 1) != rawDigit.substr(i, 1)) {
            diffCount++;
          }
          if(diffCount > 1) {
            break;
          }
        }
        if(diffCount === 1) {
          alternates.push(accountNumDict[rawDigit]);
        }
      });
      return alternates;
    }

    // This function is responsible for checking if the digit needs pipe or underline change
    function checkIfChange(account){
      let solution = [];
      console.log(rawCharacter)
      if(checksum(account)) { setAccountNumbers(accountNumbers,{num:account,valid:"OK"}); }
      
      for(let currentPos = 0; currentPos <= 9; currentPos++) {
        let alternativeDigits = checkMissingPipes(convertingDigitToNum(currentPos,rawCharacter));
        alternativeDigits.forEach(function (altDigit) {
          let accountNum = account.substr(0, currentPos) + altDigit + account.substr(currentPos + 1);
          //here we checking if the alternates are correct based on out checksum
          if(checksum(accountNum)) {
            solution.push(accountNum)
          }
        });
        if(solution.length>1){
          setAccountNumbers({num:account,valid:"AMD"})
        }
        else if (solution.length ===1 ){
          setAccountNumbers({num:solution[0],valid:"OK"})
        }
        else{
          account.includes("?") ? setAccountNumbers({num:account,valid:"ILL"}) : setAccountNumbers({num:account,valid:"ERR"})
        }
      
    }
    
    }
    
    useEffect(()  => {
        let account = readFile();
        checkIfChange(account);
        setIsLoading(false)

    }, [])



    let content ;
    if (isLoading){
      content = <div>Loading...</div>
    }
    else{
      content=(
        <div className="listItem">
              
      <li key={accountNumbers.num}>{accountNumbers.num}</li>

      <li key={accountNumbers.num}> {accountNumbers.valid}</li>
      </div>
      )
    }

    return content;
}

export default DigitReader;
