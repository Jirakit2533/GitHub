import aspose.words as aw
import os
import sys

def merge_images(file_names, export_path, file_type):
    doc = aw.Document()
    builder = aw.DocumentBuilder(doc)

    shapes = [builder.insert_image(file_name) for file_name in file_names]

    # Calculate the maximum width and height and update page settings 
    # to crop the document to fit the size of the pictures.
    pageSetup = builder.page_setup
    pageSetup.page_width = max(shape.width for shape in shapes)
    pageSetup.page_height = sum(shape.height for shape in shapes)
    pageSetup.top_margin = 0
    pageSetup.left_margin = 0
    pageSetup.bottom_margin = 0
    pageSetup.right_margin = 0

    # Adjust the position of each image to stack them vertically
    current_height = 0
    for shape in shapes:
        shape.top = current_height
        current_height += shape.height

    output_file = os.path.join(export_path, f"Output.{file_type}")
    doc.save(output_file)

if __name__ == "__main__":
    file_names = sys.argv[1].split(',')
    export_path = sys.argv[2]
    file_type = sys.argv[3]
    merge_images(file_names, export_path, file_type)
