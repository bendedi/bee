with open("report.csv","r") as fichier:
    contenu=fichier.read()

tab=contenu.split('\n')
text="["
for i in range(100, 300):
    text+= str(tab[i].split(',')[9])+","
text+=str(tab[301].split(',')[9])+"]"
with open("out.txt","w") as fichier:
    fichier.write(text)

