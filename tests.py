import sys
import csv

# Write to output file
csv_name = './teams.csv'
wtr = csv.writer(open(csv_name, 'a'),
                 delimiter=',', lineterminator='\n')
wtr.writerow(['Written_test'])
