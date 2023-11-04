import { NgModule } from '@angular/core'
import { MaterialModule } from '../material/material.module';
import { IconButtonComponent } from './ui/icon-button/icon-button.component';
import { AppbarComponent } from './ui/appbar/appbar.component';
import { ButtonComponent } from './ui/button/button.component';
import { InputComponent } from './ui/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card/user-card.component';
import { RepositoryCardComponent } from './repository-card/repository-card.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CardComponent } from './ui/card/card.component';

@NgModule({
    declarations: [
        AppbarComponent,
        ButtonComponent,
        IconButtonComponent,
        InputComponent,
        UserCardComponent,
        RepositoryCardComponent,
        ProfileHeaderComponent,
        PaginationComponent,
        CardComponent
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
        UserCardComponent,
        ProfileHeaderComponent,
        PaginationComponent,
        CardComponent
    ]
})
export class ComponentsModule {}