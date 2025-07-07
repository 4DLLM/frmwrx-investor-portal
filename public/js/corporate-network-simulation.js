// Sacred Geometry Network Simulation - Original 71,347 TPS Design
// 32 Sacred Nodes • Real-time Transaction Flow
class CorporateNetworkSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Sacred Geometry Configuration
        this.config = {
            // Performance Targets (matching original)
            targetTPS: 71347,           // Original Sacred Nexus performance
            maxVisibleTransactions: 800, // High density for visual impact
            nodeCount: 32,              // Sacred geometry: 32 nodes
            
            // Visual Settings (original design)
            nodeBaseSize: 8,
            connectionOpacity: 0.3,
            transactionSpeed: 0.03,
            consensusSpeed: 0.01,
            
            // Original Color Scheme (teal/cyan on white)
            colors: {
                background: '#ffffff',      // Clean white background
                primaryNode: '#14b8a6',     // Teal nodes
                activeNode: '#06b6d4',      // Cyan active
                hubNode: '#0891b2',         // Deep cyan hub
                connection: '#5eead4',      // Light teal connections
                activeConnection: '#06b6d4', // Cyan active connections
                transaction: '#14b8a6',     // Teal transactions
                consensus: '#8b5cf6',       // Purple consensus
                text: '#1f2937',           // Dark text
                accent: '#06b6d4',         // Cyan accent
                warning: '#f59e0b',        // Warning amber
                success: '#10b981'         // Success green
            }
        };
        
        // Performance Tracking
        this.metrics = {
            currentTPS: 0,
            peakTPS: 0,
            totalTransactions: 0,
            activeTransactions: 0,
            consensusEvents: 0,
            networkLatency: 0.8,
            energyEfficiency: 99.1,
            cpuUsage: 0,
            memoryUsage: 0,
            networkUptime: 100.0
        };
        
        // Network Components
        this.nodes = [];
        this.connections = [];
        this.transactions = [];
        this.consensusPatterns = [];
        this.particles = [];
        this.heatMap = new Map();
        
        // Animation State
        this.animationId = null;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.fps = 60;
        this.isRunning = false;
        
        // Sacred Geometry Analytics
        this.analytics = {
            tpsHistory: [],
            latencyHistory: [],
            throughputHistory: [],
            errorRate: 0,
            successRate: 99.97
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.generateSacredGeometry();
        this.createSacredConnections();
        this.initializeMetrics();
        this.setupEventListeners();
    }
    
    setupCanvas() {
        const resizeCanvas = () => {
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            
            this.canvas.width = rect.width * dpr;
            this.canvas.height = rect.height * dpr;
            this.canvas.style.width = rect.width + 'px';
            this.canvas.style.height = rect.height + 'px';
            
            this.ctx.scale(dpr, dpr);
            
            this.centerX = rect.width / 2;
            this.centerY = rect.height / 2;
            this.radius = Math.min(rect.width, rect.height) * 0.4;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
    
    generateSacredGeometry() {
        this.nodes = [];
        
        // Create 32 Sacred Nodes in perfect circle
        for (let i = 0; i < this.config.nodeCount; i++) {
            const angle = (i / this.config.nodeCount) * Math.PI * 2;
            const x = this.centerX + Math.cos(angle) * this.radius;
            const y = this.centerY + Math.sin(angle) * this.radius;
            
            this.nodes.push({
                id: i,
                x: x,
                y: y,
                angle: angle,
                layer: 0,
                type: 'sacred',
                activity: 0,
                activityDecay: 0.02,
                connections: new Set(),
                size: this.config.nodeBaseSize,
                throughput: 0,
                latency: 0.7 + Math.random() * 0.2,
                load: 0,
                status: 'active',
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }
    
    createSacredConnections() {
        this.connections = [];
        
        // Create dense sacred geometry connections
        for (let i = 0; i < this.config.nodeCount; i++) {
            for (let j = i + 1; j < this.config.nodeCount; j++) {
                const distance = Math.abs(i - j);
                const minDistance = Math.min(distance, this.config.nodeCount - distance);
                
                // Connect nodes based on sacred geometry patterns
                let shouldConnect = false;
                let connectionType = 'primary';
                let strength = 1.0;
                
                // Adjacent connections (strongest)
                if (minDistance === 1) {
                    shouldConnect = true;
                    connectionType = 'adjacent';
                    strength = 1.0;
                }
                // Every 2nd node
                else if (minDistance === 2) {
                    shouldConnect = true;
                    connectionType = 'secondary';
                    strength = 0.9;
                }
                // Every 4th node
                else if (minDistance === 4) {
                    shouldConnect = true;
                    connectionType = 'quaternary';
                    strength = 0.8;
                }
                // Every 8th node
                else if (minDistance === 8) {
                    shouldConnect = true;
                    connectionType = 'octary';
                    strength = 0.7;
                }
                // Diagonal connections (sacred ratios)
                else if (minDistance === 16) {
                    shouldConnect = true;
                    connectionType = 'diagonal';
                    strength = 0.6;
                }
                // Golden ratio connections
                else if (minDistance === 5 || minDistance === 13) {
                    shouldConnect = true;
                    connectionType = 'golden';
                    strength = 0.5;
                }
                // Additional sacred connections
                else if (minDistance === 3 || minDistance === 6 || minDistance === 10) {
                    shouldConnect = true;
                    connectionType = 'sacred';
                    strength = 0.4;
                }
                
                if (shouldConnect) {
                    this.addConnection(i, j, strength, connectionType);
                }
            }
        }
    }
    
    addConnection(fromId, toId, strength, type) {
        this.connections.push({
            from: fromId,
            to: toId,
            strength: strength,
            type: type,
            activity: 0,
            activityDecay: 0.03,
            bandwidth: 0,
            latency: 0.7 + Math.random() * 0.3,
            status: 'active'
        });
        
        this.nodes[fromId].connections.add(toId);
        this.nodes[toId].connections.add(fromId);
    }
    
    initializeMetrics() {
        // Initialize performance tracking
        this.metrics.currentTPS = 0;
        this.metrics.totalTransactions = 0;
        this.startTime = Date.now();
        
        // Initialize analytics arrays
        this.analytics.tpsHistory = new Array(120).fill(0);
        this.analytics.latencyHistory = new Array(120).fill(0.8);
        this.analytics.throughputHistory = new Array(120).fill(0);
    }
    
    setupEventListeners() {
        // Performance monitoring
        setInterval(() => this.updateMetrics(), 500);
        setInterval(() => this.updateAnalytics(), 1000);
        
        // Consensus pattern triggers
        setInterval(() => this.triggerConsensusPattern(), 4000 + Math.random() * 3000);
    }
    
    spawnSacredTransaction() {
        if (this.connections.length === 0 || this.transactions.length > this.config.maxVisibleTransactions) {
            return;
        }
        
        // Select connection based on sacred geometry patterns
        const availableConnections = this.connections.filter(conn => 
            conn.status === 'active' && this.nodes[conn.from].status === 'active'
        );
        
        if (availableConnections.length === 0) return;
        
        const connection = availableConnections[Math.floor(Math.random() * availableConnections.length)];
        const fromNode = this.nodes[connection.from];
        const toNode = this.nodes[connection.to];
        
        // Activate nodes and connection
        fromNode.activity = Math.min(fromNode.activity + 0.5, 1.0);
        toNode.activity = Math.min(toNode.activity + 0.4, 1.0);
        connection.activity = 1.0;
        connection.bandwidth += 1;
        
        // Update node metrics
        fromNode.throughput += 1;
        toNode.throughput += 1;
        fromNode.load = Math.min(fromNode.load + 0.1, 1.0);
        
        // Create sacred transaction
        const transaction = {
            id: this.metrics.totalTransactions++,
            fromNode: connection.from,
            toNode: connection.to,
            x: fromNode.x,
            y: fromNode.y,
            targetX: toNode.x,
            targetY: toNode.y,
            progress: 0,
            speed: this.config.transactionSpeed + (Math.random() * 0.01),
            size: 3 + Math.random() * 2,
            type: this.getTransactionType(),
            priority: Math.random() > 0.85 ? 'high' : 'normal',
            timestamp: Date.now(),
            latency: connection.latency,
            status: 'processing',
            pulsePhase: Math.random() * Math.PI * 2
        };
        
        this.transactions.push(transaction);
        this.metrics.activeTransactions++;
        
        // Update heat map
        const key = `${connection.from}-${connection.to}`;
        this.heatMap.set(key, (this.heatMap.get(key) || 0) + 1);
    }
    
    getTransactionType() {
        const rand = Math.random();
        if (rand < 0.4) return 'transfer';
        if (rand < 0.7) return 'smart_contract';
        if (rand < 0.85) return 'consensus';
        if (rand < 0.95) return 'validation';
        return 'system';
    }
    
    triggerConsensusPattern() {
        if (this.consensusPatterns.length > 2) return;
        
        const originNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        
        this.consensusPatterns.push({
            origin: originNode.id,
            progress: 0,
            radius: 0,
            maxRadius: this.radius * 1.2,
            segments: 32,
            type: 'sacred_consensus',
            timestamp: Date.now()
        });
        
        // Activate connected nodes for consensus
        originNode.connections.forEach(nodeId => {
            this.nodes[nodeId].activity = Math.min(this.nodes[nodeId].activity + 0.7, 1.0);
        });
        
        this.metrics.consensusEvents++;
    }
    
    updateMetrics() {
        // Calculate current TPS with gradual ramp-up to 71,347
        const now = Date.now();
        const elapsed = (now - this.startTime) / 1000;
        
        // Gradual ramp-up over 60 seconds to target TPS
        const rampProgress = Math.min(elapsed / 60, 1);
        const targetTPS = this.config.targetTPS * rampProgress;
        
        // Add realistic fluctuations
        const fluctuation = (Math.random() - 0.5) * 2000;
        this.metrics.currentTPS = Math.max(0, Math.min(
            targetTPS + fluctuation,
            this.config.targetTPS
        ));
        
        // Update peak TPS
        this.metrics.peakTPS = Math.max(this.metrics.peakTPS, this.metrics.currentTPS);
        
        // Calculate network latency
        let totalLatency = 0;
        let activeConnections = 0;
        this.connections.forEach(conn => {
            if (conn.activity > 0.1) {
                totalLatency += conn.latency;
                activeConnections++;
            }
        });
        
        this.metrics.networkLatency = activeConnections > 0 ? 
            (totalLatency / activeConnections) : 0.8;
        
        // Update system metrics
        this.metrics.cpuUsage = Math.min(25 + (this.metrics.currentTPS / 1000), 80);
        this.metrics.memoryUsage = Math.min(15 + (this.transactions.length / 10), 70);
        
        // Update dashboard
        this.updateDashboard();
    }
    
    updateAnalytics() {
        // Shift arrays and add new data
        this.analytics.tpsHistory.shift();
        this.analytics.tpsHistory.push(this.metrics.currentTPS);
        
        this.analytics.latencyHistory.shift();
        this.analytics.latencyHistory.push(this.metrics.networkLatency);
        
        this.analytics.throughputHistory.shift();
        this.analytics.throughputHistory.push(this.transactions.length);
        
        // Calculate success rate
        this.analytics.successRate = Math.max(99.5, 100 - (this.analytics.errorRate * 0.1));
    }
    
    updateDashboard() {
        // Update TPS display
        const tpsElement = document.getElementById('tpsMetric');
        if (tpsElement) {
            tpsElement.textContent = Math.round(this.metrics.currentTPS).toLocaleString();
        }
        
        // Update latency display
        const latencyElement = document.getElementById('latencyMetric');
        if (latencyElement) {
            latencyElement.textContent = `${this.metrics.networkLatency.toFixed(1)}ms`;
        }
        
        // Update energy efficiency
        const energyElement = document.getElementById('energyMetric');
        if (energyElement) {
            energyElement.textContent = `${this.metrics.energyEfficiency.toFixed(1)}%`;
        }
        
        // Update CPU usage
        const cpuElement = document.getElementById('cpuMetric');
        if (cpuElement) {
            cpuElement.textContent = `${Math.round(this.metrics.cpuUsage)}%`;
        }
        
        // Update total transactions
        const totalTxElement = document.getElementById('totalTransactions');
        if (totalTxElement) {
            totalTxElement.textContent = this.metrics.totalTransactions.toLocaleString();
        }
        
        // Update peak TPS
        const peakTpsElement = document.getElementById('peakTPS');
        if (peakTpsElement) {
            peakTpsElement.textContent = Math.round(this.metrics.peakTPS).toLocaleString();
        }
        
        // Update current TPS
        const currentTpsElement = document.getElementById('currentTPS');
        if (currentTpsElement) {
            currentTpsElement.textContent = Math.round(this.metrics.currentTPS).toLocaleString();
        }
        
        // Update header TPS
        const headerTpsElement = document.getElementById('headerTPS');
        if (headerTpsElement) {
            headerTpsElement.textContent = Math.round(this.metrics.currentTPS).toLocaleString();
        }
    }
    
    update() {
        // Spawn transactions based on current TPS
        const transactionsPerFrame = (this.metrics.currentTPS / 60) * 0.9;
        const spawnProbability = Math.min(transactionsPerFrame / 100, 0.98);
        
        // Spawn multiple transactions for high TPS
        const spawnCount = Math.floor(transactionsPerFrame / 30) + 
                          (Math.random() < (transactionsPerFrame % 30) / 30 ? 1 : 0);
        
        for (let i = 0; i < spawnCount; i++) {
            if (Math.random() < spawnProbability) {
                this.spawnSacredTransaction();
            }
        }
        
        // Update transactions
        this.transactions = this.transactions.filter(tx => {
            tx.progress += tx.speed;
            
            if (tx.progress >= 1) {
                // Transaction completed
                const toNode = this.nodes[tx.toNode];
                toNode.activity = Math.min(toNode.activity + 0.6, 1.0);
                
                // Create completion particles
                this.createCompletionEffect(tx.targetX, tx.targetY);
                
                this.metrics.activeTransactions--;
                return false;
            }
            
            // Update position with smooth interpolation
            const t = this.easeInOutCubic(tx.progress);
            const fromNode = this.nodes[tx.fromNode];
            tx.x = fromNode.x + (tx.targetX - fromNode.x) * t;
            tx.y = fromNode.y + (tx.targetY - fromNode.y) * t;
            
            return true;
        });
        
        // Update consensus patterns
        this.consensusPatterns = this.consensusPatterns.filter(pattern => {
            pattern.progress += this.config.consensusSpeed;
            pattern.radius = pattern.progress * pattern.maxRadius;
            
            return pattern.progress < 1;
        });
        
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            return particle.life > 0;
        });
        
        // Update node activities with pulse
        this.nodes.forEach(node => {
            node.activity = Math.max(0, node.activity - node.activityDecay);
            node.load = Math.max(0, node.load - 0.01);
            node.throughput *= 0.99;
            node.pulsePhase += 0.1;
        });
        
        // Update connection activities
        this.connections.forEach(conn => {
            conn.activity = Math.max(0, conn.activity - conn.activityDecay);
            conn.bandwidth *= 0.95;
        });
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    createCompletionEffect(x, y) {
        const particleCount = 6;
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const speed = 1.5 + Math.random() * 2;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.03,
                size: 2 + Math.random() * 1.5,
                color: this.config.colors.success
            });
        }
    }
    
    draw() {
        // Clear with white background
        this.ctx.fillStyle = this.config.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width / window.devicePixelRatio, 
                         this.canvas.height / window.devicePixelRatio);
        
        // Draw consensus patterns
        this.drawConsensusPatterns();
        
        // Draw connections
        this.drawConnections();
        
        // Draw nodes
        this.drawNodes();
        
        // Draw transactions
        this.drawTransactions();
        
        // Draw particles
        this.drawParticles();
        
        // Draw performance overlay
        this.drawPerformanceOverlay();
    }
    
    drawConsensusPatterns() {
        this.consensusPatterns.forEach(pattern => {
            const origin = this.nodes[pattern.origin];
            const alpha = 1 - pattern.progress;
            
            this.ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.4})`;
            this.ctx.lineWidth = 1.5;
            
            // Draw geometric pattern
            this.ctx.beginPath();
            for (let i = 0; i < pattern.segments; i++) {
                const angle = (i / pattern.segments) * Math.PI * 2;
                const x = origin.x + pattern.radius * Math.cos(angle);
                const y = origin.y + pattern.radius * Math.sin(angle);
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.stroke();
        });
    }
    
    drawConnections() {
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            const activity = conn.activity;
            
            // Base connection
            let opacity = this.config.connectionOpacity;
            let lineWidth = 1;
            let color = this.config.colors.connection;
            
            if (activity > 0.1) {
                opacity = this.config.connectionOpacity + (activity * 0.5);
                lineWidth = 1 + (activity * 2);
                color = this.config.colors.activeConnection;
            }
            
            // Connection type styling
            switch (conn.type) {
                case 'adjacent':
                    lineWidth += 0.5;
                    opacity += 0.1;
                    break;
                case 'secondary':
                    lineWidth += 0.3;
                    break;
            }
            
            this.ctx.strokeStyle = `rgba(${this.hexToRgb(color)}, ${opacity})`;
            this.ctx.lineWidth = lineWidth;
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.stroke();
        });
    }
    
    drawNodes() {
        this.nodes.forEach(node => {
            const activity = node.activity;
            const load = node.load;
            const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
            let size = node.size * (1 + activity * 0.3) * pulse;
            
            // Node glow effect
            if (activity > 0.2) {
                const glowRadius = size * 3;
                const gradient = this.ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, glowRadius
                );
                
                gradient.addColorStop(0, `rgba(20, 184, 166, ${activity * 0.3})`);
                gradient.addColorStop(0.5, `rgba(6, 182, 212, ${activity * 0.1})`);
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Node core
            let nodeColor = this.config.colors.primaryNode;
            if (activity > 0.5) {
                nodeColor = this.config.colors.activeNode;
            }
            
            // Main node
            this.ctx.fillStyle = nodeColor;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Inner highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size * 0.6, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Load indicator ring
            if (load > 0.1) {
                this.ctx.strokeStyle = `rgba(245, 158, 11, ${load})`;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, size + 3, 0, Math.PI * 2 * load);
                this.ctx.stroke();
            }
        });
    }
    
    drawTransactions() {
        this.transactions.forEach(tx => {
            let color = this.config.colors.transaction;
            let size = tx.size;
            const pulse = Math.sin(tx.pulsePhase + tx.progress * Math.PI * 4) * 0.2 + 0.8;
            size *= pulse;
            
            // Transaction type styling
            switch (tx.type) {
                case 'smart_contract':
                    color = this.config.colors.accent;
                    break;
                case 'consensus':
                    color = this.config.colors.consensus;
                    break;
                case 'validation':
                    color = this.config.colors.warning;
                    break;
                case 'system':
                    color = this.config.colors.success;
                    break;
            }
            
            // Priority styling
            if (tx.priority === 'high') {
                size += 1;
                
                // High priority glow
                const glowGradient = this.ctx.createRadialGradient(
                    tx.x, tx.y, 0,
                    tx.x, tx.y, Math.max(1, size * 2.5)
                );
                glowGradient.addColorStop(0, `rgba(255, 255, 255, 0.9)`);
                glowGradient.addColorStop(0.5, `rgba(245, 158, 11, 0.7)`);
                glowGradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
                
                this.ctx.fillStyle = glowGradient;
                this.ctx.beginPath();
                this.ctx.arc(tx.x, tx.y, size * 2.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            // Transaction core
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(tx.x, tx.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Inner highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            this.ctx.beginPath();
            this.ctx.arc(tx.x, tx.y, size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Update pulse phase
            tx.pulsePhase += 0.2;
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.fillStyle = `rgba(${this.hexToRgb(particle.color)}, ${particle.life})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawPerformanceOverlay() {
        // Performance metrics overlay
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        this.ctx.fillRect(10, 10, 220, 140);
        
        // Border
        this.ctx.strokeStyle = 'rgba(20, 184, 166, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(10, 10, 220, 140);
        
        this.ctx.fillStyle = this.config.colors.text;
        this.ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        this.ctx.textAlign = 'left';
        
        const metrics = [
            `TPS: ${Math.round(this.metrics.currentTPS).toLocaleString()}`,
            `Peak: ${Math.round(this.metrics.peakTPS).toLocaleString()}`,
            `Active TX: ${this.metrics.activeTransactions}`,
            `Total TX: ${this.metrics.totalTransactions.toLocaleString()}`,
            `Latency: ${this.metrics.networkLatency.toFixed(1)}ms`,
            `CPU: ${Math.round(this.metrics.cpuUsage)}%`,
            `Memory: ${Math.round(this.metrics.memoryUsage)}%`,
            `Uptime: ${this.metrics.networkUptime.toFixed(1)}%`
        ];
        
        metrics.forEach((metric, index) => {
            this.ctx.fillText(metric, 20, 30 + index * 16);
        });
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
            '20, 184, 166';
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.update();
        this.draw();
        
        // FPS calculation
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.animate();
        
        // Gradual TPS ramp-up for sacred demonstration
        this.rampUpTPS();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    rampUpTPS() {
        // Simulate sacred geometry scaling to 71,347 TPS
        const rampInterval = setInterval(() => {
            if (this.metrics.currentTPS < this.config.targetTPS * 0.9) {
                const increment = Math.min(3000, this.config.targetTPS - this.metrics.currentTPS);
                this.metrics.currentTPS += increment;
            } else {
                clearInterval(rampInterval);
            }
        }, 1500);
    }
    
    reset() {
        this.stop();
        this.transactions = [];
        this.consensusPatterns = [];
        this.particles = [];
        this.metrics.currentTPS = 0;
        this.metrics.totalTransactions = 0;
        this.metrics.activeTransactions = 0;
        this.metrics.consensusEvents = 0;
        this.heatMap.clear();
        
        // Reset node states
        this.nodes.forEach(node => {
            node.activity = 0;
            node.throughput = 0;
            node.load = 0;
        });
        
        // Reset connection states
        this.connections.forEach(conn => {
            conn.activity = 0;
            conn.bandwidth = 0;
        });
        
        this.start();
    }
    
    // Public API methods
    setTargetTPS(tps) {
        this.config.targetTPS = Math.max(1000, Math.min(tps, 100000));
    }
    
    getMetrics() {
        return { ...this.metrics };
    }
    
    getAnalytics() {
        return { ...this.analytics };
    }
    
    toggleDebugMode() {
        this.showNodeIds = !this.showNodeIds;
    }
}

// Initialize when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('networkCanvas');
    if (canvas) {
        // Create sacred geometry simulation instance
        window.corporateSimulation = new CorporateNetworkSimulation(canvas);
        window.corporateSimulation.start();
        
        // Connect control buttons
        const resetButton = document.getElementById('resetView');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                window.corporateSimulation.reset();
            });
        }
        
        const debugButton = document.getElementById('debugMode');
        if (debugButton) {
            debugButton.addEventListener('click', () => {
                window.corporateSimulation.toggleDebugMode();
            });
        }
        
        // Expose simulation for external control
        window.setTargetTPS = (tps) => {
            window.corporateSimulation.setTargetTPS(tps);
        };
    }
});