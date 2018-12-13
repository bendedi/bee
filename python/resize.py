#!/usr/bin/python
import os
import sys
import shutil

dir = "C:\\Users\\bdupontd\\Desktop\\python\\rep2"
dir2 = "C:\\Users\\bdupontd\\Desktop\\python\\rep4\\"


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

    for i in box:
        #print ("0")
        text += '0 '
        text += "%.6f" % (((float(txt[i + 2][9:-8]) + float(txt[i][9:-8])) / (2 * x)))
        text += ' '
        text += "%.6f" % (((float(txt[i + 3][9:-8]) + float(txt[i + 1][9:-8])) / (2 * y)))
        text += ' '
        text += "%.6f" % (((float(txt[i + 2][9:-8]) - float(txt[i][9:-8])) / x))
        text += ' '
        text += "%.6f" % (((float(txt[i + 3][9:-8]) - float(txt[i + 1][9:-8])) / y))

        text += '\n'
    print(text)
    write_file(dir2 + fil[:-3] + "txt", text)


