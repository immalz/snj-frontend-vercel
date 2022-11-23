import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
@NgModule({
    imports: [
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatStepperModule,
        MatBadgeModule,
        MatMenuModule,
        MatExpansionModule,
        MatDialogModule,
        MatSelectModule,
        MatSortModule,
        MatRippleModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatMomentDateModule,
    ],
    exports: [
        MatIconModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatStepperModule,
        MatBadgeModule,
        MatMenuModule,
        MatExpansionModule,
        MatDialogModule,
        MatSelectModule,
        MatSortModule,
        MatRippleModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatMomentDateModule
    ]
})


export class MaterialModule {}
