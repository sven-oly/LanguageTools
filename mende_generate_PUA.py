
exceptions = [
    0xe000, 0xe002m 0xe005, 0xe0008, 0xe00c, 0xe00d, 0xe00f, 0xe011, 0xe013,
    0xe015, 0xe10]
              
start = 0xe001
end = 0xe162
for code in range(start, end+1):
    print('    \'X\':  \'\u%04x\',' % code)

    #'nyo':  '\ud83a\udcc4',
