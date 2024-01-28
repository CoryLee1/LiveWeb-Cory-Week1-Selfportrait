# 确保将此脚本和ASCII艺术文本文件放在同一目录下

file_path = 'name.txt'  # 替换为ASCII艺术文件的路径

with open(file_path, 'r', encoding='utf-8') as file:
    lines = file.readlines()

# 将每行用 "" 包围，并以逗号分隔
formatted_lines = ['"' + line.rstrip('\n') + '"' for line in lines]

# 将所有行放入一个列表中
formatted_ascii_art = '[' + ',\n'.join(formatted_lines) + ']'

# 输出格式化后的ASCII艺术
print(formatted_ascii_art)

