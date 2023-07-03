import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InputComponent } from 'src/components/input/input';
import { NavComponent } from 'src/components/nav/nav';
import { SkeletonComponent } from 'src/components/skeleton/skeleton';
import { WrapperComponent } from 'src/components/wrapper/wrapper';

export const materialDesignComponents = [
  FormsModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  ReactiveFormsModule
];

export const satsComponents = [
  InputComponent,
  NavComponent,
  SkeletonComponent,
  WrapperComponent,
];
