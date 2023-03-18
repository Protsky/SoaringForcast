from glob import glob
import os


dataset_folder = 'swisstopo-2m/'
pattern = os.path.join(dataset_folder, '**', '*.tif')
paths = sorted(glob(pattern, recursive=True))


for old_path in paths:

    # Extract lower-left corder from filename.
    old_filename = os.path.basename(old_path)
    extent = old_filename.split('_')[2]
    northing = extent.split('-')[1]
    easting = extent.split('-')[0]

    # Convert from km to m.
    northing = int(northing) * 1000
    easting = int(easting) * 1000

    # Build new filename.
    new_filename = old_filename.rsplit('.', 1)[0]
    new_filename = new_filename + f'.N{northing}E{easting}.tif'
    new_path = os.path.join(os.path.dirname(old_path), new_filename)

    # Rename the file.
    os.rename(old_path, new_path)