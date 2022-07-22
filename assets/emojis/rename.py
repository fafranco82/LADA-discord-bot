import os

if __name__=='__main__':
    for f in os.listdir('.'):
        name, ext = os.path.splitext(f)
        if ext == '.png':
            os.rename(f, "icon_%s.png" % name[5:])
