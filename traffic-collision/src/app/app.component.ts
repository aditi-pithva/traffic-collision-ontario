import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedTestFile: File | null = null;
  selectedResultFile: File | null = null;
  predictionResult: any;
  errorMessage: string | null = null;
  isPedestrian = false;
  isCyclist = false;


  roadClassOptions: string[] = [
    'Major Arterial', 'Minor Arterial', 'Collector', 'Local',
    'Other', 'Pending', 'Laneway', 'Expressway', 'Expressway Ramp'
  ];

  visibilityOptions: string[] = [
    'Clear', 'Snow', 'Other', 'Rain', 'Strong wind',
    'Fog, Mist, Smoke, Dust', 'Drifting Snow', 'Freezing Rain', 'nan'
  ];

  lightOptions: string[] = [
    'Dark', 'Dark, artificial', 'Daylight', 'Dusk', 'Dawn',
    'Dusk, artificial', 'Dawn, artificial', 'Daylight, artificial', 'Other'
  ];

  impactTypeOptions: string[] = [
    'Approaching', 'SMV Other', 'Pedestrian Collisions', 'Angle',
    'Turning Movement', 'Cyclist Collisions', 'Rear End', 'Sideswipe',
    'SMV Unattended Vehicle', 'Other'
  ];

  rdsfCondOptions: string[] = [
    'Wet', 'Slush', 'Dry', 'Ice', 'Loose Snow', 'Other', 'Packed Snow',
    'Spilled liquid', 'Loose Sand or Gravel'
  ];

  invTypeOptions: string[] = [
    'Passenger', 'Driver', 'Vehicle Owner', 'Other Property Owner',
    'Pedestrian', 'Cyclist', 'Other', 'Motorcycle Driver',
    'Truck Driver', 'In-Line Skater', 'Driver - Not Hit',
    'Motorcycle Passenger', 'Moped Driver', 'Wheelchair',
    'Pedestrian - Not Hit', 'Trailer Owner', 'Witness',
    'Cyclist Passenger'
  ];

  injuryOptions: string[] = [
    'Major', 'None', 'Minor', 'Fatal', 'Minimal'
  ];

  vehTypeOptions: string[] = [
    'Automobile, Station Wagon', 'Other', 'Passenger Van',
    'Municipal Transit Bus (TTC)', 'Taxi', 'Bicycle', 'Delivery Van',
    'Motorcycle', 'Truck - Open', 'Moped', 'Pick Up Truck',
    'Tow Truck', 'Police Vehicle', 'Truck-Tractor', 'Street Car',
    'Truck - Closed (Blazer, etc)', 'Truck - Dump',
    'Bus (Other) (Go Bus, Gray Coa', 'Construction Equipment',
    'Intercity Bus', 'Truck (other)', 'Fire Vehicle', 'School Bus',
    'Other Emergency Vehicle', 'Off Road - 2 Wheels', 'Truck - Tank',
    'Truck - Car Carrier'
  ];

  pedTypeOptions: string[] = [
    'Pedestrian hit at mid-block',
    'Vehicle is going straight thru inter.while ped cross without ROW',
    'Vehicle is going straight thru inter.while ped cross with ROW',
    'Pedestrian hit a PXO/ped. Mid-block signal',
    'Pedestrian involved in a collision with transit vehicle anywhere along roadway',
    'Vehicle turns left while ped crosses with ROW at inter.',
    'Other / Undefined',
    'Vehicle turns left while ped crosses without ROW at inter.',
    'Vehicle turns right while ped crosses with ROW at inter.',
    'Vehicle hits the pedestrian walking or running out from between parked vehicles at mid-block',
    'Unknown',
    'Vehicle turns right while ped crosses without ROW at inter.',
    'Pedestrian hit on sidewalk or shoulder',
    'Vehicle is reversing and hits pedestrian',
    'Pedestrian hit at private driveway',
    'Pedestrian hit at parking lot'
  ];

  pedActOptions: string[] = [
    'Crossing without right of way', 'Crossing with right of way',
    'Crossing, Pedestrian Crossover', 'Crossing, no Traffic Control',
    'Other', 'Running onto Roadway',
    'Coming From Behind Parked Vehicle', 'Pushing/Working on Vehicle',
    'On Sidewalk or Shoulder', 'Walking on Roadway Against Traffic',
    'Playing or Working on Highway', 'Person Getting on/off Vehicle',
    'Walking on Roadway with Traffic',
    'Crossing marked crosswalk without ROW',
    'Person Getting on/off School Bus'
  ];

  pedCondOptions: string[] = [
    'Inattentive', 'Normal', 'Unknown',
    'Medical or Physical Disability', 'Had Been Drinking',
    'Ability Impaired, Alcohol', 'Other',
    'Ability Impaired, Alcohol Over .80', 'Ability Impaired, Drugs',
    'Fatigue'
  ];

  cyclistTypeOptions: string[] = [
    'Motorist turned left across cyclists path.',
    'Motorist turning right on green or amber at signalized intersection strikes cyclist.',
    'Cyclist struck opened vehicle door',
    'Cyclist and Driver travelling in same direction. One vehicle rear-ended the other.',
    'Motorist turns right at non-signal Inter.(stop, yield, no cont.,and dwy) and strikes cyclist.',
    'Cyclist makes u-turn in-front of driver.',
    'Cyclist and Driver travelling in same direction. One vehicle sideswipes the other.',
    'Cyclist strikes pedestrian.',
    'Cyclist loses control and strikes object (pole, ttc track)',
    'Cyclist without ROW rides into path of motorist at inter, lnwy, dwy-Cyclist not turn.',
    'Cyclist turns right across motorists path',
    'Motorist turning right on red at signalized intersection strikes cyclist.',
    'Cyclist turned left across motorists path.',
    'Motorist without ROW drives into path of cyclist at inter, lnwy, dwy-Driver not turn.',
    'Cyclist rode off sidewalk into road at midblock.',
    'Insufficient information (to determine cyclist crash type).',
    'Cyclist struck at PXO(cyclist either travel in same dir. as veh. or ride across xwalk)',
    'Motorist reversing struck cyclist.',
    'Motorist loses control and strikes cyclist.',
    'Cyclist strikes a parked vehicle.',
    'Motorist makes u-turn in-front of cyclist.',
    'Cyclist falls off bike - no contact with motorist.'
  ];

  cycActOptions: string[] = [
    'Driving Properly', 'Other', 'Improper Turn',
    'Improper Passing', 'Disobeyed Traffic Control', 'Lost control',
    'Failed to Yield Right of Way', 'Improper Lane Change',
    'Following too Close', 'Speed too Fast For Condition',
    'Wrong Way on One Way Road'
  ];

  cycCondOptions: string[] = [
    'nan', 'Normal', 'Inattentive', 'Had Been Drinking', 'Unknown',
    'Ability Impaired, Drugs', 'Ability Impaired, Alcohol Over .80',
    'Medical or Physical Disability', 'Ability Impaired, Alcohol',
    'Other', 'Fatigue'
  ];

  accLocOptions: string[] = ['Intersection Related', 'At Intersection', 'Non Intersection',
    'Private Driveway', 'At/Near Private Drive', 'Underpass or Tunnel',
    'Overpass or Bridge', 'Trail', 'Laneway'];
  
  trafficControlOption: string[] = ['No Control', 'Traffic Signal', 'Pedestrian Crossover',
    'Stop Sign', 'Yield Sign', 'Traffic Controller',
    'School Guard', 'Police Control', 'Traffic Gate',
    'Streetcar (Stop for)']

  yesNoOptions: string[] = ['Yes', 'No'];

  form = new FormGroup({
    TIME: new FormControl(null, Validators.required),
    STREET1: new FormControl('', Validators.required),
    STREET2: new FormControl('', Validators.required),
    ROAD_CLASS: new FormControl('', Validators.required),
    DISTRICT: new FormControl('', Validators.required),
    LATITUDE: new FormControl('', Validators.required),
    LONGITUDE: new FormControl('', Validators.required),
    ACCLOC: new FormControl('', Validators.required),
    TRAFFCTL: new FormControl('', Validators.required),
    VISIBILITY: new FormControl('', Validators.required),
    LIGHT: new FormControl('', Validators.required),
    RDSFCOND: new FormControl('', Validators.required),
    IMPACTYPE: new FormControl('', Validators.required),
    INVTYPE: new FormControl('', Validators.required),
    INVAGE: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    INJURY: new FormControl('', Validators.required),
    VEHTYPE: new FormControl('', Validators.required),
    PEDTYPE: new FormControl(''),
    PEDACT: new FormControl(''),
    PEDCOND: new FormControl(''),
    CYCLISTYPE: new FormControl(''),
    CYCACT: new FormControl(''),
    CYCCOND: new FormControl(''),
    PEDESTRIAN: new FormControl('', Validators.required),
    CYCLIST: new FormControl('', Validators.required),
    AUTOMOBILE: new FormControl('', Validators.required),
    MOTORCYCLE: new FormControl('', Validators.required),
    TRUCK: new FormControl('', Validators.required),
    TRSN_CITY_VEH: new FormControl('', Validators.required),
    EMERG_VEH: new FormControl('', Validators.required),
    PASSENGER: new FormControl('', Validators.required),
    SPEEDING: new FormControl('', Validators.required),
    AG_DRIV: new FormControl('', Validators.required),
    REDLIGHT: new FormControl('', Validators.required),
    ALCOHOL: new FormControl('', Validators.required),
    DISABILITY: new FormControl('', Validators.required),
    HOOD_158: new FormControl('', Validators.required),
    NEIGHBOURHOOD_158: new FormControl('', Validators.required),
    HOOD_140: new FormControl('', Validators.required),
    NEIGHBOURHOOD_140: new FormControl('', Validators.required),
    DIVISION: new FormControl('', Validators.required)
  });

  constructor(private apiService: ApiService) { }

  onTestFileChange(event: any): void {
    this.selectedTestFile = event.target.files[0];
  }

  onResultFileChange(event: any): void {
    this.selectedResultFile = event.target.files[0];
  }

  onPedestrianChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.isPedestrian = target.value.toLocaleLowerCase() === 'yes';
  }

  onCylistChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.isCyclist = target.value.toLocaleLowerCase() === 'yes';
  }

  onSubmit(): void {
    this.predictionResult = null;
    this.errorMessage = null;
    if (this.form.valid) {
      const formData = new FormData();
      // formData.append('test', this.selectedTestFile);
      // formData.append('result', this.selectedResultFile);

       // Manually append each form value
       formData.append('TIME', this.form.value.TIME ?? '');
      formData.append('STREET1', this.form.value.STREET1 ?? '');
      formData.append('STREET2', this.form.value.STREET2 ?? '');
      formData.append('ROAD_CLASS', this.form.value.ROAD_CLASS ?? '');
      formData.append('DISTRICT', this.form.value.DISTRICT ?? '');
      formData.append('LATITUDE', this.form.value.LATITUDE ?? '');
      formData.append('LONGITUDE', this.form.value.LONGITUDE ?? '');
      formData.append('ACCLOC', this.form.value.ACCLOC ?? '');
      formData.append('TRAFFCTL', this.form.value.TRAFFCTL ?? '');
      formData.append('VISIBILITY', this.form.value.VISIBILITY ?? '');
      formData.append('LIGHT', this.form.value.LIGHT ?? '');
      formData.append('RDSFCOND', this.form.value.RDSFCOND ?? '');
      formData.append('IMPACTYPE', this.form.value.IMPACTYPE ?? '');
      formData.append('INVTYPE', this.form.value.INVTYPE ?? '');
      formData.append('INVAGE', this.form.value.INVAGE ?? '');
      formData.append('INJURY', this.form.value.INJURY ?? '');
      formData.append('VEHTYPE', this.form.value.VEHTYPE ?? '');
      formData.append('PEDTYPE', this.form.value.PEDTYPE ?? '');
      formData.append('PEDACT', this.form.value.PEDACT ?? '');
      formData.append('PEDCOND', this.form.value.PEDCOND ?? '');
      formData.append('CYCLISTYPE', this.form.value.CYCLISTYPE ?? '');
      formData.append('CYCACT', this.form.value.CYCACT ?? '');
      formData.append('CYCCOND', this.form.value.CYCCOND ?? '');
      formData.append('PEDESTRIAN', this.form.value.PEDESTRIAN ?? '');
      formData.append('CYCLIST', this.form.value.CYCLIST ?? '');
      formData.append('AUTOMOBILE', this.form.value.AUTOMOBILE ?? '');
      formData.append('MOTORCYCLE', this.form.value.MOTORCYCLE ?? '');
      formData.append('TRUCK', this.form.value.TRUCK ?? '');
      formData.append('TRSN_CITY_VEH', this.form.value.TRSN_CITY_VEH ?? '');
      formData.append('EMERG_VEH', this.form.value.EMERG_VEH ?? '');
      formData.append('PASSENGER', this.form.value.PASSENGER ?? '');
      formData.append('SPEEDING', this.form.value.SPEEDING ?? '');
      formData.append('AG_DRIV', this.form.value.AG_DRIV ?? '');
      formData.append('REDLIGHT', this.form.value.REDLIGHT ?? '');
      formData.append('ALCOHOL', this.form.value.ALCOHOL ?? '');
      formData.append('DISABILITY', this.form.value.DISABILITY ?? '');
      formData.append('HOOD_158', this.form.value.HOOD_158 ?? '');
      formData.append('NEIGHBOURHOOD_158', this.form.value.NEIGHBOURHOOD_158 ?? '');
      formData.append('HOOD_140', this.form.value.HOOD_140 ?? '');
      formData.append('NEIGHBOURHOOD_140', this.form.value.NEIGHBOURHOOD_140 ?? '');
      formData.append('DIVISION', this.form.value.DIVISION ?? '');

      this.apiService.modelPrediction(formData).subscribe(
        response => {
          const objectIds = response.OBJECTID;
          const acclass = response.ACCLASS;
          this.predictionResult = objectIds.map((id: number, index: number) => ({
            OBJECT_ID: id,
            ACCLASS: acclass[index]
          }));
        },
        error => {
          this.errorMessage = error;
        }
      );
    } else {
      this.errorMessage = 'Please check all the inputs.';
    }
  }
}
