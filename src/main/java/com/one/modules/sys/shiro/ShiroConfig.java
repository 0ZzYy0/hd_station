package com.one.modules.sys.shiro;

import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Shiro的配置文件
 *
 * @author zy
 * @email 553224182@qq.com
 * @date 2017/9/27 22:02
 */
@Configuration
public class ShiroConfig {

    @Bean("sessionManager")
    public SessionManager sessionManager(RedisShiroSessionDAO redisShiroSessionDAO,
                                         @Value("${one.redis.open}") boolean redisOpen,
                                         @Value("${one.shiro.redis}") boolean shiroRedis){
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        //设置session过期时间为1小时(单位：毫秒)，默认为30分钟
        sessionManager.setGlobalSessionTimeout(60 * 60 * 1000);
        sessionManager.setSessionValidationSchedulerEnabled(true);
        sessionManager.setSessionIdUrlRewritingEnabled(false);

        //如果开启redis缓存且one.shiro.redis=true，则shiro session存到redis里
        if(redisOpen && shiroRedis){
            sessionManager.setSessionDAO(redisShiroSessionDAO);
        }
        return sessionManager;
    }

    @Bean("securityManager")
    public SecurityManager securityManager(UserRealm userRealm, SessionManager sessionManager) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(userRealm);
        securityManager.setSessionManager(sessionManager);

        return securityManager;
    }


    @Bean("shiroFilter")
    public ShiroFilterFactoryBean shirFilter(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);
        shiroFilter.setLoginUrl("/login.html");
        //没有权限跳转默认页面
        shiroFilter.setUnauthorizedUrl("/");

        Map<String, String> filterMap = new LinkedHashMap<String, String>();
        filterMap.put("/statics/**", "anon");
        //filterMap.put("/swagger/**", "anon");
        filterMap.put("/login.html", "anon");
        filterMap.put("/error.html", "anon");
        filterMap.put("/sys/login", "anon");
        filterMap.put("/baspatient", "anon");
        filterMap.put("/favicon.ico", "anon");
        filterMap.put("/captcha.jpg", "anon");
        //filterMap.put("/oAuth2", "anon");
        filterMap.put("/mobile/login", "anon");
        filterMap.put("/partemp/save", "anon");
        filterMap.put("/partemp/info/**", "anon");
        filterMap.put("/partemp/**", "anon");
        //filterMap.put("/partemp/queryShock", "anon");
        filterMap.put("/modules/mobile/home.html", "anon");
        filterMap.put("/modules/param/param_demo.html", "anon");
        filterMap.put("/modules/mobile/mobile_login.html", "anon");
        filterMap.put("/staparam/save", "anon");
        filterMap.put("/**", "authc");
        shiroFilter.setFilterChainDefinitionMap(filterMap);

        return shiroFilter;
    }

    @Bean("lifecycleBeanPostProcessor")
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    @Bean
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator proxyCreator = new DefaultAdvisorAutoProxyCreator();
        proxyCreator.setProxyTargetClass(true);
        return proxyCreator;
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor advisor = new AuthorizationAttributeSourceAdvisor();
        advisor.setSecurityManager(securityManager);
        return advisor;
    }
}
