import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppPreloadingStrategy } from './app.preloading.strategy';
import { HomeComponent } from './basic/component/home/home.component';
// import { LoginComponent } from './basic/component/login/login.component';


/**
 * Angular gives us two types of preloading strategy: NoPreloading (which loads module only after a specific request
 * for a component in a specific module) and PreloadAllModules (which loads all the modules initially).
 * To overcome latency of load-on-demand I introduce a custom preloading strategy.
 *
 * For child modules inside the data object I add two properties,both boolean:
 * - preload — if I want to preload that module or not
 * - delay - if I want to load as soon as possible or with a delay
 *
 * See AppPreloadingStrategy for other details.
 */
const routes: Routes = [
  
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [RoleGuardService]
  },
  /*{
    path: 'login',
    component: LoginComponent,
    // canActivate: [NoAuthGuardService]
  },*/

  /*
  {
    path: 'user/detail',
    component: UserDetailComponent,
    canActivate: [RoleGuardService],
    resolve: {
      user: UserDetailResolver
    }
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: { preload: false, delay: false }
  },
  {
    path: 'step',
    loadChildren: './step/step.module#StepModule',
    data: { preload: false, delay: false }
  },
  {
    path: 'cs',
    loadChildren: './cs/cs.module#CsModule',
    data: { preload: false, delay: false }
  },
  { path: 'logout', component: LogoutComponent, canActivate: [RoleGuardService] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RoleGuardService]
  },
  { path: 'test', component: BlankComponent },*/
  { path: '**', redirectTo: 'home', pathMatch: 'full' } // comment this to disable redirect to homepage for unrecognized routes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy }),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

