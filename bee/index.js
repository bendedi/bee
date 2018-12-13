/**
* Auteur : Maxime Graff
* Date : 08/08/2018
* Version : 0.1
* Description : serveur NodeJS pour la Demo ruche connectée
*/

// librairies et dependances
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const server = express();
const LPF = require('lpf')
var tabDate=[]
var tabPoid=[]
var tabTemp=[]
var tabBroodTemp=[]
var tabHumidite=[]
var acc=1
var firstLoad=true
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('report.csv')
});

function smooth() {
        for (var i = 2; i < tabBroodTemp.length-2; i++) {
                tabBroodTemp[i]=(tabBroodTemp[i-2]+tabBroodTemp[i-1]+tabBroodTemp[i]+tabBroodTemp[i+1]+tabBroodTemp[i+2])/5
                tabTemp[i]=(tabTemp[i-2]+tabTemp[i-1]+tabTemp[i]+tabTemp[i+1]+tabTemp[i+2])/5
                tabHumidite[i]=(tabHumidite[i-2]+tabHumidite[i-1]+tabHumidite[i]+tabHumidite[i+1]+tabHumidite[i+2])/5
        }
}

lineReader.on('line', function (line) {
        if (line.split(',')[0]!="Time") {
                var array= line.split(',')
                if ((parseFloat(array[9])>20) && (parseFloat(array[7]) < 60) && (parseFloat(array[5]) >0) )  {
                        if(( acc>100) && (acc % 3 ==0)) {
                                tabDate.push(array[0]);
                                tabPoid.push(parseFloat(array[9]));
                                tabBroodTemp.push(parseFloat(array[5]));
                                tabTemp.push(parseFloat(array[7]));
                                tabHumidite.push(parseFloat(array[3]));
                        }


                        acc+=1
                }

        }


});

 server.use(express.static(__dirname + '/css')).use(express.static(__dirname + '/js')).use(express.static(__dirname + '/image')).use(express.static(__dirname + '/bootstrap'));
/** dialogFlow communique avec le serveur via /bot*/
server.get('/home', function (req, res) {
        res.sendFile('index.html', {root: __dirname })
});

server.get('/livecam', function (req, res) {
        res.sendFile('camera.html', {root: __dirname })
});

server.get('/explain', function (req, res) {
        res.sendFile('explain.html', {root: __dirname })
});

server.get('/moreinfo', function (req, res) {
        res.sendFile('moreinfo.html', {root: __dirname })
});

server.get('/greenApproach', function (req, res) {
        res.sendFile('greenApproach.html', {root: __dirname })
});

server.get('/stats', function (req, res) {

        if (firstLoad) {
                firstLoad=false
                /*
                LPF.smoothing=0.1;
                tabTemp= LPF.smoothArray(tabTemp)
                tabBroodTemp= LPF.smoothArray(tabBroodTemp) */
                for (var i = 0; i < 12; i++) {
                        smooth()
                }
        }



    res.render('stats.ejs', {date:tabDate.toString(), temp:tabTemp.toString(), tempIn:tabBroodTemp.toString(), humidite: tabHumidite.toString(),poid:tabPoid.toString()});
});
//lancement du serveur
server.listen(3000);
