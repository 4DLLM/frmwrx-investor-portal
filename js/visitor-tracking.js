// FRMWRX Visitor Tracking System
// Simple client-side analytics for tracking dashboard visitors

class VisitorTracker {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.pageViews = [];
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    init() {
        // Track page view
        this.trackPageView();
        
        // Track time on page
        this.trackTimeOnPage();
        
        // Track user interactions
        this.trackInteractions();
        
        // Send data before page unload
        window.addEventListener('beforeunload', () => {
            this.sendAnalytics();
        });
    }

    trackPageView() {
        const pageData = {
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            sessionId: this.sessionId
        };

        this.pageViews.push(pageData);
        
        // Store in localStorage for persistence
        this.storeVisitorData(pageData);
        
        console.log('📊 FRMWRX Analytics: Page view tracked', pageData);
    }

    trackTimeOnPage() {
        // Track engagement time
        setInterval(() => {
            const timeOnPage = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateEngagementTime(timeOnPage);
        }, 10000); // Update every 10 seconds
    }

    trackInteractions() {
        // Track clicks on important elements
        document.addEventListener('click', (event) => {
            const target = event.target;
            
            // Track specific interactions
            if (target.matches('.cta-button, .demo-button, .corporate-demo-btn')) {
                this.trackEvent('button_click', {
                    buttonText: target.textContent,
                    buttonClass: target.className,
                    timestamp: new Date().toISOString()
                });
            }
            
            // Track navigation
            if (target.matches('a[href]')) {
                this.trackEvent('link_click', {
                    linkText: target.textContent,
                    linkHref: target.href,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                this.trackEvent('scroll_depth', {
                    depth: scrollDepth,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }

    trackEvent(eventType, eventData) {
        const event = {
            type: eventType,
            data: eventData,
            sessionId: this.sessionId,
            timestamp: new Date().toISOString()
        };

        // Store event
        const events = JSON.parse(localStorage.getItem('frmwrx_events') || '[]');
        events.push(event);
        localStorage.setItem('frmwrx_events', JSON.stringify(events.slice(-100))); // Keep last 100 events

        console.log('📊 FRMWRX Analytics: Event tracked', event);
    }

    updateEngagementTime(timeOnPage) {
        const engagementData = {
            sessionId: this.sessionId,
            timeOnPage: timeOnPage,
            lastUpdate: new Date().toISOString()
        };

        localStorage.setItem('frmwrx_engagement', JSON.stringify(engagementData));
    }

    storeVisitorData(pageData) {
        // Store visitor data in localStorage
        const visitors = JSON.parse(localStorage.getItem('frmwrx_visitors') || '[]');
        visitors.push(pageData);
        
        // Keep only last 50 visits to prevent storage bloat
        const recentVisitors = visitors.slice(-50);
        localStorage.setItem('frmwrx_visitors', JSON.stringify(recentVisitors));

        // Update visitor count
        const visitorCount = parseInt(localStorage.getItem('frmwrx_visitor_count') || '0') + 1;
        localStorage.setItem('frmwrx_visitor_count', visitorCount.toString());
    }

    sendAnalytics() {
        // In a real implementation, this would send data to your analytics server
        const analyticsData = {
            pageViews: this.pageViews,
            events: JSON.parse(localStorage.getItem('frmwrx_events') || '[]'),
            engagement: JSON.parse(localStorage.getItem('frmwrx_engagement') || '{}'),
            sessionId: this.sessionId,
            totalTimeOnSite: Math.floor((Date.now() - this.startTime) / 1000)
        };

        // For now, just log to console
        console.log('📊 FRMWRX Analytics: Session data', analyticsData);

        // TODO: Send to analytics endpoint
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(analyticsData)
        // });
    }

    // Public method to get analytics data
    static getAnalyticsData() {
        return {
            visitors: JSON.parse(localStorage.getItem('frmwrx_visitors') || '[]'),
            events: JSON.parse(localStorage.getItem('frmwrx_events') || '[]'),
            engagement: JSON.parse(localStorage.getItem('frmwrx_engagement') || '{}'),
            visitorCount: parseInt(localStorage.getItem('frmwrx_visitor_count') || '0')
        };
    }

    // Public method to clear analytics data
    static clearAnalyticsData() {
        localStorage.removeItem('frmwrx_visitors');
        localStorage.removeItem('frmwrx_events');
        localStorage.removeItem('frmwrx_engagement');
        localStorage.removeItem('frmwrx_visitor_count');
        console.log('📊 FRMWRX Analytics: Data cleared');
    }
}

// Auto-initialize tracking when script loads
if (typeof window !== 'undefined') {
    window.frmwrxTracker = new VisitorTracker();
    
    // Make analytics data available globally
    window.getFRMWRXAnalytics = VisitorTracker.getAnalyticsData;
    window.clearFRMWRXAnalytics = VisitorTracker.clearAnalyticsData;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisitorTracker;
}