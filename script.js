function myFunction(){
  
var input=document.getElementById('mainContainer').value;  // Get the input from the textArea
var lines=input.split('\n');                               // Splitting the input line by line

var getWeights,queryResults,formattedResult;

    getWeights=assignWeights(lines);                 // To assign weights to the page keywords and query keywords
    queryResults=calculatePageRating(getWeights);    // Then calculate the page ratings for each query
    formattedResult=formatOutput(queryResults);      // Format the final output according to the sample output
    displayOutput(formattedResult);                  // Display the final output in the Output TextArea
}

//Function to assign weights to the page keywords and query keywords, taking N=8
function assignWeights(lines){
            var line,weighingArray={},pwCount,pageWords,queryWeighingArray={},qwCount,queryObj=[],pageObj=[];
            for(var i=0;i<lines.length;i++){
                  line=lines[i];
                  if(line[0]=='P' || line[0]=='p'){
                      weighingArray={};
                      pwCount=8;
                      pageWords=line.split(' ');
                      pageWords.forEach(function(d){
                      if(d!='P' && d!='p' && d){
                            if(!weighingArray[d]){
                                  weighingArray[d]=pwCount;
                                  pwCount--;
                            }
                      }
                      })
                      pageObj.push(weighingArray);
                 }
                 else if(line[0]=='Q' || line[0]=='q'){
                      queryWeighingArray={};
                      qwCount=8;
                      queryWords=line.split(' ');
                      queryWords.forEach(function(d){
                              if(d!='Q' && d!='q' && d){
                                    if(!queryWeighingArray[d]){
                                        queryWeighingArray[d]=qwCount;
                                        qwCount--;
                                }
                            }    
                      })
                      queryObj.push(queryWeighingArray);
                  }
              }

              return {
                          pageWeigths: pageObj,
                          queryWeigths: queryObj
                     };
}

//Function to calculate the page ratings for each query
function calculatePageRating(getWeights){
            var pageObj = getWeights.pageWeigths,
                queryObj = getWeights.queryWeigths,
                queryResult={},queryMainResult=[],pageStrength,pageNumber;
                queryObj.forEach(function(d){
                pageNumber=1;
                  queryResult={};
                  pageObj.forEach(function(e){
                    pageStrength=0;
                      for(var i in d){
                         for(var j in e){
                           if(i==j){
                             pageStrength+=d[i]*e[j]; 
                            }
                         }
                      }
                      if(pageStrength!=0){
                         queryResult['P'+pageNumber]=pageStrength;
                      }
                      pageNumber++;
                  })
                  queryMainResult.push(queryResult);
              })
              return queryMainResult;
}

//Function to format the final output 
function formatOutput(queryResults){
           var outputString='',arr,str;
               queryResults.forEach(function(d,i){
                   arr = sortObject(d);  //sort the pages in decending order
                   str='Q'+(i+1)+': ';
                   if(arr){
                    for(var i in arr){
                         str+=arr[i].key + ' ';
                     }
                   }
                   outputString+=str+'\n';
                })
               console.log(outputString);
               return outputString;
}

//Function to display the final output
function displayOutput(outputString){
      document.getElementById('outputContainer').value=outputString;
}

//Function to sort the pages by calculated strength ratings in decending order
function sortObject(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return b.value - a.value;
    });
    if(arr.length>5) arr.pop();
  
    return arr; // returns array
}
