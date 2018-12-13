#!/usr/bin/python
import os
import sys
import shutil

dir = "C:\\Users\\bdupontd\\Desktop\\python\\rep2"
dir2 = "C:\\Users\\bdupontd\\Desktop\\python\\rep5\\"
d = 416/640

def search(contents, text):
    i = 0
    a = []
    for tmp in contents:
        if tmp.find(text) != -1:
            a.append(i)
        i += 1
    return(a)

def read_file(file):
    f = open(file, "r")
    contents = f.readlines()
    f.close()
    return(contents)

def write_file(file, contents):
    f = open(file, "w")
    contents = "".join(contents)
    f.write(contents)
    f.close()

coordonne_xml = [f for f in os.listdir(dir) if f[0] != "."]
x = 640
y = 352
for fil in coordonne_xml:    
    print(fil)
    txt = read_file(dir + "\\" + fil)
    box = search(txt, "xmin")

    text = ''
    text += '<annotation>'
    text += '\n'
    text += '\t'
    text += '<folder>rep5</folder>'
    text += '\n'
    text += '\t'
    text += '<filename>' + fil[:-3] + "jpg" + '</filename>'
    text += '\n'
    text += '\t'
    text += '<path>C:\\Users\\bdupontd\\Desktop\\python\\rep3'
    text += "\\"
    text +=  fil[:-3] + "jpg" + '</path>'
    text += '\n'
    text += '\t'
    text += '<source>'
    text += '\n'
    text += '\t'
    text += '\t'
    text += '<database>Unknown</database>'
    text += '\n'
    text += '\t'
    text += '</source>'
    text += '\n'
    text += '\t'
    text += '<size>'
    text += '\n'
    text += '\t'
    text += '\t'
    text += '<width>416</width>'
    text += '\n'
    text += '\t'
    text += '\t'
    text += '<height>228</height>'
    text += '\n'
    text += '\t'
    text += '\t'
    text += '<depth>3</depth>'
    text += '\n'
    text += '\t'
    text += '</size>'
    text += '\n'
    text += '\t'
    text += '<segmented>0</segmented>'
    print(box)

    for i in box:
        #print ("0")
        text += '\n'
        text += '\t'
        text += '<object>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '<name>bee</name>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '<pose>Unspecified</pose>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '<truncated>0</truncated>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '<difficult>0</difficult>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '<bndbox>'
        text += '\n'
        text += '\t' * 3
        text += '<xmin>'
        text += str(int(int(txt[i][9:-8]) * d))
        text += '</xmin>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '\t'
        text += '<ymin>'
        text += str(int(int(txt[i + 1][9:-8]) * d))
        text += '</ymin>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '\t'
        text += '<xmax>'
        text += str(int(int(txt[i + 2][9:-8]) * d))
        text += '</xmax>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '\t'
        text += '<ymax>'
        text += str(int(int(txt[i + 3][9:-8]) * d))
        text += '</ymax>'
        text += '\n'
        text += '\t'
        text += '\t'
        text += '</bndbox>'
        text += '\n'
        text += '\t'
        text += '</object>'

    text += '\n'
    text += '</annotation>'
    text += '\n'
    print(text)
    # exit(1)
    write_file(dir2 + fil[:-3] + "xml", text)
    # exit(1)
