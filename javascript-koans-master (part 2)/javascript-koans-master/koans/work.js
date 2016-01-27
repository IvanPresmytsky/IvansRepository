//reverseArray
function reverseArray(array) {
  if (!(Object.prototype.toString.call(array) === "[object Array]")||array.length === 0) {
    throw new Error();
  }
  var revArray = [];
  var arrayLength = array.length;
  for ( var i = 0; i < arrayLength; i++) {
   	revArray.unshift(array[i]); 
  }
  return revArray;
}

function reverseArrayInPlace(array) {
  if (!(Object.prototype.toString.call(array) === "[object Array]")||array.length === 0) {
    throw new Error();
  }
  var revArray = array;
  var arrayLength = array.length;
  var roundedLength = Math.floor(arrayLength / 2);
  for ( var i = 0; i < roundedLength; i++) {
    var x = array[i];
   	revArray[i] = array[arrayLength-1-i];
    array[arrayLength-1-i] = x;
  }
  return revArray;
}
  

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]


//Array to list
function arrayToList(array) {
  if(!(Object.prototype.toString.call(array) === "[object Array]")||array.length === 0){
    throw new Error();
  }
  var list = null;
  var arrayLength = array.length;
  for ( var i = arrayLength-1; i >= 0; i--) {
  list = {value: array[i], rest: list};
  }
  return list;
}

function listToArray(list) {
  if(!(Object.prototype.toString.call(list) === "[object Object]")){
  throw new Error();
  }
  var array = [];
  for ( var i = list; i ; i = i.rest) {
  array.push(i.value);
  }
  return array;
}

function prepend (value, list) {
  return list = {value: value, rest: list};
}

function nth (list, index) {
  if(!(typeof(index) === "number")){
  throw new Error();
  }
  var array = listToArray(list);
  return array[index];
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20


//Deep equality

function deepEqual (obj1, obj2) {
  if((typeof(obj1) === "object")&&(!(obj1 === null))||
     (typeof(obj2) === "object")&&(!(obj2 === null))) {
     
    var containingProperty = function (obj) {
        var objProperty = [];
      for (var key in obj) {
          objProperty.push(key);
      }
        return objProperty;
     };
    
    var objProperty1 = containingProperty(obj1);
    var objProperty2 = containingProperty(obj2);
    var valCount1 = objProperty1.length;
    var valCount2 = objProperty2.length;
    
    if (valCount1 === valCount2) {
      var equality = false;
      for (var i = 0; i < valCount1; i++) {
        if(objProperty1[i] === objProperty2[i]) {
           equality = deepEqual(obj1[objProperty1[i]], obj2[objProperty2[i]]);
             if(equality === false) {
               return false;
             }
        }
      }
      return equality;
    } else {
      return false;
    }   
  } else {
    return obj1 === obj2; 
  }
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

// --- Flattening

var arrays = [[1, 2, 3], [4, 5], [6]];

console.log(arrays.reduce(function(newArray, current){
  return newArray.concat(current);
}, []));

// → [1, 2, 3, 4, 5, 6]


//------reduce
// На входе массив чисел, например: arr = [1,2,3,4,5].
//Напишите функцию getSums(arr), которая возвращает массив его частичных сумм.
//Иначе говоря, вызов getSums(arr) должен возвращать новый массив из такого же числа элементов, в котором на каждой позиции должна быть сумма элементов arr до этой позиции включительно.

  var arr = [1,2,3,4,5];
    var getSums = function (array) {
      if(!(Object.prototype.toString.call(array) === "[object Array]") || (array.length === 0)) {
        throw new Error();
      }
      var newArray = [];
      array.reduce(function(sum, current, i){
        return newArray[i] = sum + current;
      }, 0);
      return newArray;
    };
    
    console.log(getSums(arr));


    //-----Mother-child age difference

    function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

var hasKnownMother = ancestry.filter(function (person){
  return byName[person.mother];
});

var motherAge = hasKnownMother.map(function(person){
    return person.born - byName[person.mother].born;
});

//console.log(byName);

console.log(hasKnownMother);
console.log(motherAge);
console.log(average(motherAge));
// → 31.2



//-----Historical life expectancy

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byCenturyBorn = {};

ancestry.forEach(function(person, i){
    var century = Math.ceil(person.died / 100);
    var age = person.died - person.born;
    ancestry[i].century = century;
    ancestry[i].age = age;
});

function groupBy(centuryInput) {
  var ageArray = [];
  ageArray = ancestry.filter(function(person){
    return person.century === centuryInput;
}).map(function(person){
    return person.age;
});
  return ageArray;
}

for ( var i = 16, l = i + 6; i < l; i++) {
    byCenturyBorn[i] = average(groupBy(i));
 }

console.log(byCenturyBorn);

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94


//--- Факториал числа

function factorialize(num) {
  if(!(typeof(num) === "number")) {
   throw new Error(); 
  }
  
  if (num === 0) return 1;
  var array = [];
  for (var i = 1, l= num+1; i < l; i++) {
    array.push(i);
  }
  num = array.reduce( function (sum, current) {
    return sum * current;
  });
  return num;
}

factorialize(0);




//----Check for Palindromes

function palindrome(str) {
  if(!(typeof(str) === "string") || str.length === 0) {
  throw new Error();
  }
  
  var removeSpace = function (symbol) {
    return !(symbol === " "||symbol === ","||symbol === "-"||symbol === ".");
  };
  
  var revStr = str.split("").filter(removeSpace).reverse().join("");
  str = str.split("").filter(removeSpace).reverse().join("");

  return revStr === str;
}

console.log(palindrome("0_0 (: /-\ :) 0-0"));

//----Pig latin

function translate(str) {
  if(!str||str.length === 0) {
    throw new Error();
  }
 //var consonant = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
  var vowel = ["a", "e", "i", "o", "u", "y"];
  str = str.toLowerCase();
  var firstSymbol = str[0];
  var arr = vowel.filter(function(item){
    return firstSymbol.indexOf(item) != -1;
  });
  
 if(arr.length === 0) {
   str = str.substr(1) + str[0] + "ay";
 } else  { 
   str = str + "way";
 }
 return str;
  
}

translate("aconsonant");

//---- Bonfire: Missing letters

function fearNotLetter(str) {
  if (!str || str.length === 0) {
    throw new Error();
  }
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  var firstIndex = alphabet.indexOf(str[0]);
  var lastIndex = alphabet.indexOf(str[str.length - 1]) + 1;
  var ommitedLetters = "";
  var newStr = alphabet.slice(firstIndex, lastIndex);

  for( var i = 0, l = newStr.length; i < l; i++ ) {
    if(str.indexOf(newStr[i]) === -1) {
      ommitedLetters += newStr[i];
    }  
  }
  if(ommitedLetters === "") {
  ommitedLetters = undefined;
  }
  return ommitedLetters;
}

fearNotLetter("abce");

//----binare decoder

function binaryAgent(str) {
  var arr = [];
  var newStr = "";
  arr = str.match(/\S+/g);
  console.log(arr);
  
  for (var i = 0, l = arr.length; i < l; i++) {
    var char = String.fromCharCode(arr[i]);
    console.log(char);
    newStr += char;
    console.log(newStr);
  }

  return newStr;
}