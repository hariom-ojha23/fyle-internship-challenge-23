import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule
    ],
    exports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class MaterialModule {}
