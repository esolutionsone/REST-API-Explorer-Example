import os

def replace_old_scope_name_in_file(files, old_scope_name, new_scope_name):
    #For each file, read the file in binary mode and replace all instances of the old_scope_name with the new old_scope_name
    for file_path in files:
        with open(file_path, 'rb') as file:  # Open the file in binary mode
            content = file.read() #read the file and encode in utf-8
        if old_scope_name.encode('utf-8') in content:
            updated_content = content.replace(old_scope_name.encode('utf-8'), new_scope_name.encode('utf-8')) #replace all instances of old instance scope

            with open(file_path, 'wb') as file:  # Open the file in binary mode
                file.write(updated_content) # update file with new contents
                print(f"File cleanup run for {file_path}") # Print impacted files to the terminal

def rename_dirs_and_files(paths, old_scope_name, new_scope_name):
    for path in paths:
        if old_scope_name in path:
            # Only replace last instance of old_scope_name so files get renamed, then dirs on their own loop
            path_list = path.rsplit(old_scope_name, 1)
            new_path  = new_scope_name.join(path_list)
            os.rename(path, new_path) # Update the name of the file or directory
            print(f"Renamed {path} to {new_path}") # Print impacted file or dir with new path to terminal
 
# Specify the root directory and the old_scope_name you want to match
scope_name     = '853443' # old_scope_name from our original working file
print("\n \nCurrent Scope Name: x-" + scope_name + "- \n")
print("Next step is to get the number of your new scope, if you need help with this check the README in git (it should be the scopename shown if/when the deploy fails) \n")

new_scope_name = input("Enter the 'number' of your new scope name: ")  # User Input to get new instance scope Use raw_input() in Python 2
print("\n")

# Call functions to replace scope old_scope_namees in file contents & to rename directories, & files
# First cleanup file contents, then files, then directories to ensure the no "file not found" errors

#Check if we're in the appropriate directory
#If not, Navigate to the appropriate directory to run the script
#If the above doesn't work, add note to user that we need to be in the correct directory
cwd = os.getcwd()
if 'REST-API-Explorer-Example' not in cwd:
    if os.path.exists('./REST-API-Explorer-Example'):
        os.chdir('./REST-API-Explorer-Example')
    else:
        print("Please navigate to the appropriate directory to run this renamer script > should be in ./REST-API-Explorer-Example")
        exit()
elif 'REST-API-Explorer-Example' in cwd:
    pass
else:
    print("Please navigate to the appropriate directory to run this renamer script > should be in ./REST-API-Explorer-Example")
    exit()

#Files & Directories to scrub/replace (windows & mac paths below)
mac_files           = [ './now-ui.json',
                        './src/index.js',
                        './src/x-853443-testing-project/index.js',
                        './src/x-853443-testing-project/__tests__/test.x-853443-testing-project.js',
                        './README.md',
                        './_update_instance_details.py' ]
mac_dirs_and_files  = [ './src/x-853443-testing-project/__tests__/test.x-853443-testing-project.js',
                        './src/x-853443-testing-project' ]

win_files           = [ '.\\now-ui.json',
                        '.\\src\\index.js',
                        '.\\src\\x-853443-testing-project\\index.js',
                        '.\\src\\x-853443-testing-project\\__tests__\\test.x-853443-testing-project.js',
                        '.\\README.md',
                        '.\\_update_instance_details.py' ]
win_dirs_and_files = [  '.\\src\\x-853443-testing-project\\__tests__\\test.x-853443-testing-project.js',
                        '.\\src\\x-853443-testing-project' ]

# If we're running Linux/Mac based, use mac files, elif we're using Windows, use Windows filepaths
if  os.name is 'posix':
    replace_old_scope_name_in_file(mac_files, scope_name, new_scope_name)
    rename_dirs_and_files(mac_dirs_and_files, scope_name, new_scope_name)

elif os.name is 'nt':
    replace_old_scope_name_in_file(win_files, scope_name, new_scope_name)
    rename_dirs_and_files(win_dirs_and_files, scope_name, new_scope_name)