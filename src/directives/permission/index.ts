import { usePermissionStoreHook } from "@/store/modules/permission";
import { Directive } from "vue";

export const auth: Directive = {
  mounted(el: any, binding: any) {
    
    const { value } = binding;
    if (value) {
      const authRoles = value;
      const hasAuth = usePermissionStoreHook().buttonAuth.includes(authRoles);
      if (!hasAuth) {
        el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("need roles! Like v-auth=\"['admin','test']\"");
    }
  }
}