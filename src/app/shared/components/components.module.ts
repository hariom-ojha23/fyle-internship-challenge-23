import { NgModule } from '@angular/core'
import { MaterialModule } from '../material/material.module';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { AppbarComponent } from './appbar/appbar.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCardsComponent } from './user-cards/user-cards.component';

@NgModule({
    declarations: [
        AppbarComponent,
        ButtonComponent,
        IconButtonComponent,
        InputComponent,
        UserCardsComponent
    ],
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        AppbarComponent,
        ButtonComponent,
        IconButtonComponent,
        InputComponent,
        UserCardsComponent
    ]
})
export class ComponentsModule {}