from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/merge', methods=['POST'])
def merge():
    data = request.json
    file_names = data['file_names']
    export_path = data['export_path']
    file_type = data['file_type']
    
    command = f'python home.py "{",".join(file_names)}" "{export_path}" "{file_type}"'
    result = os.system(command)
    
    if result == 0:
        return jsonify({'status': 'success', 'message': 'Files merged successfully!'})
    else:
        return jsonify({'status': 'error', 'message': 'Error merging files'})

if __name__ == '__main__':
    app.run(debug=True)
