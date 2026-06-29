import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MaterialModule } from '../../shared/components/material/material.module';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // constructor(
  //   @Inject(PLATFORM_ID) private platformId: Object,
  //   private authService: AuthService,
  //   private router: Router,
  //   private tokenService: TokenService,
  //   private formBuild: FormBuilder,
  // ) {
  //   this.buildForm();
  // }
  // anio = new Date().getFullYear();
  // loginForm!: FormGroup;
  // viewMessage = false;
  // isLoading = false;
  // private intervalId: any;
  // private currentIndex = 0;
  // username = "";
  // password = "";
  // errorMessage = "";
  // buildForm() {
  //   this.loginForm = this.formBuild.group({
  //     username: [""],
  //     password: [""],
  //   });
  // }
  // // Array de imágenes que se van a mostrar como fondo
  // private images = [
  //   "https://res.cloudinary.com/dpumt2sth/image/upload/v1760923740/FB_IMG_1760923290035_zhpsdf.jpg",
  //   "https://res.cloudinary.com/dpumt2sth/image/upload/v1760925914/001141011W_ifexwv.jpg",
  // ];
  // onSubmit() {
  //   this.isLoading = true;
  //   if (this.loginForm.get("username")?.value.length >= 8 && this.loginForm.get("password")?.value.length >= 8) {
  //     this.authService.login(this.username, this.password).subscribe({
  //       next: (data) => {
  //         const helper = new JwtHelperService();
  //         const token = data.value.access_token;
  //         this.tokenService.saveToken(token);
  //         const decodedToken = helper.decodeToken(token);
  //         const rol = decodedToken.role.toUpperCase();
  //         switch (rol) {
  //           case "DOCENTE":
  //             this.router.navigate(["/"]);
  //             break;
  //           case "TUTOR":
  //             this.router.navigate(["/participante"], { replaceUrl: true });
  //             break;
  //           default:
  //             this.router.navigate(["/admin"]);
  //             break;
  //         }
  //         this.isLoading = false;
  //       },
  //       error: (err) => {
  //         this.isLoading = false;
  //         this.viewMessage = true;
  //         this.errorMessage = err.error.value == undefined ? err.error?.message : err.error.value;
  //         setTimeout(() => {
  //           this.viewMessage = false;
  //         }, 3000);
  //       },
  //     });
  //   }
  // }
  // asignarLogin(): boolean {
  //   this.username = this.loginForm.get("username")?.value || "";
  //   this.password = this.loginForm.get("password")?.value || "";
  //   return this.username.length >= 1 && this.password.length >= 1;
  // }
  // hide = signal(true);
  // clickEvent(event: MouseEvent) {
  //   this.hide.set(!this.hide());
  //   event.stopPropagation();
  // }
  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.changeBackgroundImage();
  //     this.intervalId = setInterval(() => this.changeBackgroundImage(), 9000);
  //   }
  // }
  // ngOnDestroy(): void {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // }
  // validarAlfanumerico(event: KeyboardEvent) {
  //   validarInput(event, "alfanumerico");
  // }
  // private changeBackgroundImage(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const authFluidRight = document.querySelector(".auth-fluid-right") as HTMLElement;
  //     if (authFluidRight) {
  //       authFluidRight.style.backgroundImage = `url('${this.images[this.currentIndex]}')`;
  //       this.currentIndex = (this.currentIndex + 1) % this.images.length;
  //     }
  //   }
  // }
}
