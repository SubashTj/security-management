import { NavigationService } from "./navigation.service";
import { LayoutService } from "./layout.service";
import { PermissionService } from "./permission.service";
import { ThemeService } from "./theme.service";
import { RoutePartsService } from "./route-parts.service";
import { ApiService } from "./api.service";
import { AppLoaderService } from "./app-loader.service";
import { ToastService } from "./toaster.service";
import { ConfigService } from "./congif.service";
import { VerifyGuard } from "./verify-guard.service";
import { UserService } from "./user.service";
import { MatchMediaService } from "./match-media.service";
export const serviceProvider = [
    NavigationService,
    LayoutService,
    PermissionService,
    ThemeService,
    RoutePartsService,
    ApiService,
    AppLoaderService,
    ToastService,
    ConfigService,
    VerifyGuard,
    UserService,
    MatchMediaService
 
]