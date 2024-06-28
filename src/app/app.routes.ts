import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductoAddComponent } from './producto-add/producto-add.component';
import { InicarsesionComponent } from './inicarsesion/inicarsesion.component';
import { TokenResetearComponent } from './tokenresetear/tokenresetear.component';
import { CrearCuentaComponent } from './crearcuenta/crearcuenta.component';
import { TokencrearComponent } from './tokencrear/tokencrear.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosFormComponent } from './pedidosform/pedidosform.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo:'/iniciarsesion',
        pathMatch: 'full'
    },

    {
        path:'home',
        component: HomeComponent,
    },
    {
        path:'productos',
        component: ProductosComponent,
    },
    {
        path:'producto-form',
        component: ProductoAddComponent,
    },
    {
        path:'iniciarsesion',
        component: InicarsesionComponent,
    },
    {
        path: 'tokenresetear',
        component: TokenResetearComponent
    },
    {
        path: 'registrar',
        component: CrearCuentaComponent
    },
    {
        path: 'tokenconfirmar',
        component: TokencrearComponent
    },
    {
        path: 'pedidos',
        component: PedidosComponent
    },
    {
        path: 'pedidos-form',
        component: PedidosFormComponent
    }
        
];
