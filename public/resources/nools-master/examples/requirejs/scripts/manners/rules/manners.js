(function(){ function _getCompiled(nools){ return nools.compile({"define":[{"name":"Chosen","properties":"({\n id : null,\n guestName : null,\n hobby : null,\n toString:function () {\n return [\"[Chosen : id=\", this.id, \" name=\", this.guestName, \" hobby=\", this.hobby, \"]\"].join(\" \");\n }\n})"},{"name":"Context","properties":"({\n state : \"start\",\n toString:function () {\n return [\"[Context state =\", this.stringValue, \"]\"].join(\"\");\n }\n})"},{"name":"Count","properties":"({\n value : 0,\n toString:function () {\n return [\"[Count value=\", this.value, \"]\"].join(\"\");\n }\n})"},{"name":"Guest","properties":"({\n name : \"\",\n sex : \"\",\n hobby : \"\",\n toString:function () {\n return [\"[Guest name=\", this.name, \", sex=\", this.sex, \", hobbies=\", this.hobby, \"]\"].join(\"\");\n }\n})"},{"name":"LastSeat","properties":"({\n seat : null,\n toString:function () {\n return [\"[LastSeat seat=\", this.seat, \"]\"].join(\"\");\n }\n})"},{"name":"Path","properties":"({\n id : null,\n seat : null,\n guestName : null,\n toString:function () {\n return [\"[Path id=\", this.id, \" name=\", this.guestName, \" seat=\", this.seat, \"]\"].join(\"\");\n }\n})"},{"name":"Seating","properties":"({\n id : null,\n pid : null,\n path : null,\n leftSeat : null,\n leftGuestName : null,\n rightSeat : null,\n rightGuestName : null,\n toString:function () {\n return [\"[Seating id=\", this.id, \" pid=\", this.pid, \" pathDone=\", this.path, \" leftSeat=\", this.leftSeat,\n \" leftGuestName=\", this.leftGuestName, \" rightSeat=\", this.rightSeat, \" rightGuestName=\", this.rightGuestName, \"]\"].join(\"\")\n }\n})"}],"rules":[{"name":"assignFirstSeat","options":{},"constraints":[["Context","c","c.state == 'start'"],["Guest","g"],["Count","count"]],"action":"var leftGuestName = g.name;\n var seating = new Seating({\n id : count.value,\n pid : 0,\n path : true,\n leftSeat : 1,\n leftGuestName : leftGuestName,\n rightSeat : 1,\n rightGuestName : leftGuestName\n });\n assert(seating);\n var path = new Path({id : count.value, seat : 1, guestName : leftGuestName});\n assert(path);\n modify(count, function(){\n this.value++\n });\n log('assign first seat : ' + seating.toString() + ' : ' + path);\n modify(c, function(){\n this.state = 'assign';\n });\n "},{"name":"findSeating","options":{},"constraints":[["Context","c","c.state == 'assign'"],["Seating","s","s.path == true",{"id":"sid","rightGuestName":"seatingRightGuestName","rightSeat":"rightSeat"}],["Guest","g","g.name == seatingRightGuestName",{"sex":"rightGuestSex","hobby":"rightGuestHobby"}],["Guest","lg","lg.sex != rightGuestSex && lg.hobby == rightGuestHobby",{"name":"leftGuestName"}],["Count","count",{"value":"countValue"}],["not","Path","p","p.id == sid && p.guestName == leftGuestName"],["not","Chosen","chosen","chosen.id == sid && chosen.guestName == leftGuestName && chosen.hobby == rightGuestHobby"]],"action":"assert(new Seating({\n id : countValue,\n pid : sid,\n path : false,\n leftSeat : s.rightSeat,\n leftGuestName : seatingRightGuestName,\n rightSeat : rightSeat + 1,\n rightGuestName : leftGuestName\n }));\n var path = new Path({id : countValue, seat : rightSeat + 1, guestName : leftGuestName});\n assert(path);\n assert(new Chosen({id : sid, guestName : leftGuestName, hobby : rightGuestHobby}));\n modify(count, function(){this.value++;});\n modify(c, function(){this.state = 'make'});\n "},{"name":"makePath","options":{},"constraints":[["Context","c","c.state == 'make'"],["Seating","s","s.path == false",{"id":"sid","pid":"seatingPid"}],["Path","p","p.id == seatingPid",{"guestName":"pathGuestName","seat":"pathSeat"}],["not","Path","p2","p2.id == sid && p2.guestName == pathGuestName"]],"action":"assert(new Path({id : sid, seat : pathSeat, guestName : pathGuestName}));\n "},{"name":"pathDone","options":{},"constraints":[["Context","c","c.state == 'make'"],["Seating","s","s.path == false"]],"action":"modify(s, function(){\n this.path = true;\n });\n modify(c, function(){\n this.state = 'check';\n });\n log('path Done : ' + s);\n "},{"name":"areWeDone","options":{},"constraints":[["Context","c","c.state == 'check'"],["LastSeat","ls",{"seat":"lastSeat"}],["Seating","s","s.rightSeat == lastSeat"]],"action":"modify(c, function(){this.state = 'print';})\n "},{"name":"continue","options":{},"constraints":[["Context","c","c.state == 'check'"]],"action":"modify(c, function(){this.state = 'assign'});\n "},{"name":"allDone","options":{},"constraints":[["Context","c","c.state == 'print'"]],"action":"log('All Done');\n "}],"scope":[{"name":"log","body":"function(str){\n document.getElementById(\"output\").innerHTML += str + \"</br>\";\n}"}]}, {name : "manners"}); } if ("undefined" !== typeof exports) { if ("undefined" !== typeof module && module.exports) { return _getCompiled(require("nools")); } } else if ("function" === typeof define && define.amd) { define(["nools"], function (nools) { return _getCompiled(nools); }); } else { _getCompiled(this.nools); } }).call(this);
