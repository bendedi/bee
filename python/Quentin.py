from PIL import Image
import os

max_w = 416
max_h = 416

path = "C:\\Users\\bdupontd\\Desktop\\python\\rep1"  # Ne pas mettre de "\\" à la fin
save_path = "C:\\Users\\bdupontd\\Desktop\\python\\rep3"  # Ne pas mettre de "\\" à la fin
#path = "C:\\Users\\qfinck\\Desktop\\DetectionObjects\\darkflow\\train\\ImagesOld"  # Ne pas mettre de "\\" à la fin
#save_path = "C:\\Users\\qfinck\\Desktop\\DetectionObjects\\darkflow\\train\\Images"  # Idem

photos = [f for f in os.listdir(path) if f[0] != "."]
#print(photos)

for filename in photos:
    img = Image.open(path + "\\" + filename).convert('RGB')
    w, h = img.size


   # img = img.resize((max_w, max_h))
    if h > max_h:
        ratio = max_h / h
        w, h = int(ratio*w), int(ratio*h)
        img = img.resize((w, h))

    if w > max_w:
        ratio = max_w / w
        w, h = int(ratio*w), int(ratio*h)
        img = img.resize((w, h))

    #print(save_path + "\\" + filename[:-3] + "jpg")
    img.save(save_path + "\\" + filename[:-3] + "jpg")
    #exit(1)