import os
import shutil
flag = 0
rep = "..\\photo validée par moi\\"
for file in os.listdir(rep):
    flag += 1
    if flag % 2:
        shutil.copyfile(rep + file, "rep1\\" + file)
    else:
        shutil.copyfile(rep + file, "rep2\\" + file)
