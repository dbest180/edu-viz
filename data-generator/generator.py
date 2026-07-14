import json
import csv
import random
import os

# Configuration
SUBJECTS = ['mathematics', 'english', 'business-studies', 'science', 'history']
NUM_STUDENTS = 20
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'output')

# Realistic name pools
FIRST_NAMES_FEMALE = [
    'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 
    'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 
    'Sofia', 'Avery', 'Ella', 'Scarlett', 'Grace', 'Chloe', 'Victoria'
]

FIRST_NAMES_MALE = [
    'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 
    'Lucas', 'Henry', 'Theodore', 'Jack', 'Levi', 'Alexander', 'Jackson',
    'Mateo', 'Daniel', 'Michael', 'Mason', 'Sebastian', 'Ethan'
]

LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
    'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
]

FORM_CLASSES = ['9A', '9B', '10A', '10B', '11A', '11B']


def get_band(score):
    """Determine performance band based on score."""
    if score >= 80:
        return 'Distinction'
    elif score >= 60:
        return 'Merit'
    elif score >= 40:
        return 'Pass'
    else:
        return 'Needs Support'


def generate_students():
    """Generate a list of students with consistent data across subjects."""
    students = []
    used_names = set()
    
    for i in range(NUM_STUDENTS):
        gender = random.choice(['Male', 'Female'])
        first_names = FIRST_NAMES_MALE if gender == 'Male' else FIRST_NAMES_FEMALE
        first_name = random.choice(first_names)
        last_name = random.choice(LAST_NAMES)
        name = f"{first_name} {last_name}"
        
        # Ensure unique names
        while name in used_names:
            first_name = random.choice(first_names)
            last_name = random.choice(LAST_NAMES)
            name = f"{first_name} {last_name}"
        used_names.add(name)
        
        students.append({
            'student_id': i + 1,
            'name': name,
            'gender': gender,
            'form_class': random.choice(FORM_CLASSES)
        })
    
    return students


def generate_score():
    """Generate a realistic score with normal distribution centered around 65."""
    score = int(random.gauss(65, 15))
    return max(0, min(100, score))


def generate_subject_data(students, subject):
    """Generate score data for a specific subject."""
    data = []
    for student in students:
        score = generate_score()
        data.append({
            'student_id': student['student_id'],
            'name': student['name'],
            'gender': student['gender'],
            'form_class': student['form_class'],
            'score': score,
            'band': get_band(score)
        })
    return data


def calculate_statistics(all_data):
    """Calculate overall statistics across all subjects."""
    stats = {
        'total_students': NUM_STUDENTS,
        'total_subjects': len(SUBJECTS),
        'subjects': {}
    }
    
    for subject, data in all_data.items():
        scores = [record['score'] for record in data]
        avg_score = sum(scores) / len(scores)
        passing = sum(1 for s in scores if s >= 40)
        
        band_counts = {'Distinction': 0, 'Merit': 0, 'Pass': 0, 'Needs Support': 0}
        for record in data:
            band_counts[record['band']] += 1
        
        stats['subjects'][subject] = {
            'average_score': round(avg_score, 1),
            'highest_score': max(scores),
            'lowest_score': min(scores),
            'passing_rate': round((passing / len(scores)) * 100, 1),
            'band_distribution': band_counts
        }
    
    return stats


def write_json(data, filename):
    """Write data to a JSON file."""
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
    print(f"Generated: {filepath}")


def write_csv(data, filename):
    """Write data to a CSV file."""
    filepath = os.path.join(OUTPUT_DIR, filename)
    if not data:
        return
    fieldnames = list(data[0].keys())
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    print(f"Generated: {filepath}")


def main():
    """Main function to generate all data."""
    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Set seed for reproducibility (optional - remove for truly random data)
    random.seed(42)
    
    # Generate base student list
    students = generate_students()
    print(f"Generated {len(students)} students")
    
    # Generate data for each subject
    all_data = {}
    for subject in SUBJECTS:
        subject_data = generate_subject_data(students, subject)
        all_data[subject] = subject_data
        
        # Write JSON (hyphenated filename - matches data-loader.js)
        write_json(subject_data, f"{subject}.json")
        
        # Write CSV (hyphenated filename)
        write_csv(subject_data, f"{subject}.csv")
    
    # Generate metadata/statistics
    stats = calculate_statistics(all_data)
    write_json(stats, 'metadata.json')
    
    # Also generate a combined statistics file
    write_json(stats, 'statistics.json')
    
    print(f"\nData generation complete!")
    print(f"Output directory: {OUTPUT_DIR}")


if __name__ == '__main__':
    main()
