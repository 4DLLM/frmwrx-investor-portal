// Sacred Nexus Blockchain Visualization - Professional Edition
class SacredNexusVisualization {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.transactions = [];
        this.geometricPatterns = [];
        this.consensusActive = false;
        
        // Professional Color Palette
        this.colors = {
            background: '#0f172a',      // Deep slate background
            node: '#475569',           // Muted slate nodes
            nodeActive: '#3b82f6',     // Professional blue for activity
            connection: '#334155',      // Subtle connection lines
            connectionActive: '#60a5fa', // Lighter blue for active connections
            transaction: '#10b981',     // Success green for transactions
            consensus: '#8b5cf6',       // Purple for consensus patterns
            text: '#f8fafc'            // Clean light text
        };
        
        // Configuration - Aligned with Sacred Nexus specs
        this.nodeCount = 13; // Metatron's Cube topology
        this.baseNodeSize = 4;
        this.connectionOpacity = 0.3;
        this.transactionSpeed = 0.03;
        this.consensusSpeed = 0.01;
        this.currentTPS = 0;
        this.targetTPS = 10000; // As per specifications
        
        // Performance tracking
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
        this.lastMetricUpdate = 0;
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.generateMetatronCube();
        this.createMetatronConnections();
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
    }
    
    generateMetatronCube() {
        this.nodes = [];
        
        // Central node
        this.nodes.push({
            id: 0,
            x: this.centerX,
            y: this.centerY,
            layer: 0,
            activity: 0,
            activityDecay: 0.02,
            connections: [],
            size: this.baseNodeSize + 2,
            isHub: true
        });
        
        // Inner circle (6 nodes)
        const innerRadius = this.radius * 0.3;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            this.nodes.push({
                id: this.nodes.length,
                x: this.centerX + Math.cos(angle) * innerRadius,
                y: this.centerY + Math.sin(angle) * innerRadius,
                layer: 1,
                activity: 0,
                activityDecay: 0.02,
                connections: [],
                size: this.baseNodeSize + 1
            });
        }
        
        // Outer circle (6 nodes)
        const outerRadius = this.radius * 0.6;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            this.nodes.push({
                id: this.nodes.length,
                x: this.centerX + Math.cos(angle) * outerRadius,
                y: this.centerY + Math.sin(angle) * outerRadius,
                layer: 2,
                activity: 0,
                activityDecay: 0.02,
                connections: [],
                size: this.baseNodeSize
            });
        }
    }
    
    createMetatronConnections() {
        this.connections = [];
        
        // Connect central node to all inner nodes
        for (let i = 1; i <= 6; i++) {
            this.connections.push({
                from: 0,
                to: i,
                strength: 1.0,
                activity: 0
            });
            this.nodes[0].connections.push(i);
            this.nodes[i].connections.push(0);
        }
        
        // Connect inner nodes to outer nodes (each inner connects to 2 outer)
        const innerToOuterMap = {
            1: [7, 8],
            2: [8, 9],
            3: [9, 10],
            4: [10, 11],
            5: [11, 12],
            6: [12, 7]
        };
        
        for (const [innerId, outerIds] of Object.entries(innerToOuterMap)) {
            for (const outerId of outerIds) {
                this.connections.push({
                    from: parseInt(innerId),
                    to: outerId,
                    strength: 0.8,
                    activity: 0
                });
                this.nodes[innerId].connections.push(outerId);
                this.nodes[outerId].connections.push(parseInt(innerId));
            }
        }
        
        // Connect outer nodes to form hexagram
        const outerConnections = [
            [7, 9], [7, 11], [9, 11], // Triangle 1
            [8, 10], [8, 12], [10, 12]  // Triangle 2
        ];
        
        for (const [a, b] of outerConnections) {
            this.connections.push({
                from: a,
                to: b,
                strength: 0.7,
                activity: 0
            });
            this.nodes[a].connections.push(b);
            this.nodes[b].connections.push(a);
        }
    }
    
    update() {
        // Gradually increase TPS to target
        if (this.currentTPS < this.targetTPS) {
            this.currentTPS = Math.min(
                this.currentTPS + (this.targetTPS - this.currentTPS) * 0.01,
                this.targetTPS
            );
        }
        
        // Spawn transactions based on TPS
        const transactionsPerFrame = (this.currentTPS / 60) * 0.01;
        
        if (Math.random() < transactionsPerFrame) {
            this.spawnTransaction();
        }
        
        // Update transactions
        this.transactions = this.transactions.filter(tx => {
            tx.progress += tx.speed;
            
            if (tx.progress >= 1) {
                // Transaction complete
                const toNode = this.nodes[tx.toNode];
                toNode.activity = Math.min(toNode.activity + 0.4, 1);
                
                // Occasionally trigger consensus pattern
                if (Math.random() < 0.3 && !this.consensusActive) {
                    this.triggerConsensusPattern(tx.toNode);
                }
                return false;
            }
            
            // Update position
            const from = this.nodes[tx.fromNode];
            const to = this.nodes[tx.toNode];
            tx.x = from.x + (to.x - from.x) * tx.progress;
            tx.y = from.y + (to.y - from.y) * tx.progress;
            
            return true;
        });
        
        // Update geometric patterns (consensus visualization)
        this.geometricPatterns = this.geometricPatterns.filter(pattern => {
            pattern.progress += this.consensusSpeed;
            
            if (pattern.progress >= 1) {
                this.consensusActive = false;
                return false;
            }
            
            return true;
        });
        
        // Update node and connection activity
        this.nodes.forEach(node => {
            node.activity = Math.max(0, node.activity - node.activityDecay);
        });
        
        this.connections.forEach(conn => {
            conn.activity = Math.max(0, conn.activity - 0.015);
        });
        
        // Update metrics every second
        const now = performance.now();
        if (now - this.lastMetricUpdate > 1000) {
            this.updateDashboardMetrics();
            this.lastMetricUpdate = now;
        }
    }
    
    spawnTransaction() {
        if (this.connections.length === 0) return;
        
        const connection = this.connections[Math.floor(Math.random() * this.connections.length)];
        const fromNode = this.nodes[connection.from];
        const toNode = this.nodes[connection.to];
        
        // Activate nodes and connection
        fromNode.activity = Math.min(fromNode.activity + 0.3, 1);
        toNode.activity = Math.min(toNode.activity + 0.2, 1);
        connection.activity = 1;
        
        // Create transaction
        this.transactions.push({
            fromNode: connection.from,
            toNode: connection.to,
            x: fromNode.x,
            y: fromNode.y,
            progress: 0,
            speed: this.transactionSpeed + Math.random() * 0.007,
            size: 3
        });
    }
    
    triggerConsensusPattern(originNodeId) {
        this.consensusActive = true;
        const originNode = this.nodes[originNodeId];
        
        // Create geometric resonance pattern
        this.geometricPatterns.push({
            origin: originNodeId,
            progress: 0,
            radius: 0,
            maxRadius: this.radius * 0.8,
            segments: 6
        });
        
        // Activate connected nodes
        originNode.connections.forEach(nodeId => {
            this.nodes[nodeId].activity = 1;
        });
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw geometric consensus patterns
        this.geometricPatterns.forEach(pattern => {
            const origin = this.nodes[pattern.origin];
            const radius = pattern.progress * pattern.maxRadius;
            const segments = pattern.segments;
            
            this.ctx.strokeStyle = `rgba(139, 92, 246, ${1 - pattern.progress})`;
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            
            // Draw sacred geometry pattern
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                const x = origin.x + radius * Math.cos(angle);
                const y = origin.y + radius * Math.sin(angle);
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.closePath();
            this.ctx.stroke();
            
            // Draw connecting lines to origin
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                const x = origin.x + radius * Math.cos(angle);
                const y = origin.y + radius * Math.sin(angle);
                
                this.ctx.beginPath();
                this.ctx.moveTo(origin.x, origin.y);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
            }
        });
        
        // Draw connections
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            const activity = conn.activity;
            const baseOpacity = this.connectionOpacity;
            const opacity = baseOpacity + (activity * 0.5);
            
            this.ctx.strokeStyle = activity > 0.1
                ? `rgba(96, 165, 250, ${opacity})`
                : `rgba(51, 65, 85, ${opacity})`;
            
            this.ctx.lineWidth = 1 + (activity * 2);
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            const activity = node.activity;
            const size = node.size * (1 + activity * 0.5);
            
            if (activity > 0.1) {
                this.ctx.fillStyle = this.colors.nodeActive;
                this.ctx.shadowBlur = 12;
                this.ctx.shadowColor = this.colors.nodeActive;
            } else {
                this.ctx.fillStyle = this.colors.node;
                this.ctx.shadowBlur = 4;
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            }
            
            // Draw hub node with different style
            if (node.isHub) {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Draw inner circle for hub
                this.ctx.fillStyle = '#ffffff';
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, size * 0.5, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.shadowBlur = 0;
        });
        
        // Draw transactions
        this.transactions.forEach(tx => {
            this.ctx.fillStyle = this.colors.transaction;
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = this.colors.transaction;
            
            this.ctx.beginPath();
            this.ctx.arc(tx.x, tx.y, tx.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.shadowBlur = 0;
        });
        
        // Update FPS counter
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
        }
    }
    
    updateDashboardMetrics() {
        // Update metrics in real-time
        const tpsElement = document.getElementById('tpsMetric');
        const latencyElement = document.getElementById('latencyMetric');
        const energyElement = document.getElementById('energyMetric');
        const cpuElement = document.getElementById('cpuMetric');
        const timestampElement = document.getElementById('timestamp');
        
        if (tpsElement) {
            // Simulate realistic TPS fluctuations
            const tps = this.currentTPS * (0.95 + Math.random() * 0.1);
            tpsElement.textContent = Math.round(tps).toLocaleString();
        }
        
        if (latencyElement) {
            // Simulate latency between 45-52ms
            const latency = 45 + Math.floor(Math.random() * 8);
            latencyElement.textContent = `${latency}ms`;
        }
        
        if (energyElement) {
            // Fixed energy efficiency as per specs
            energyElement.textContent = '0.0001 kWh';
        }
        
        if (cpuElement) {
            // Simulate CPU usage between 35-60%
            const cpu = 35 + Math.floor(Math.random() * 26);
            cpuElement.textContent = `${cpu}%`;
        }
        
        if (timestampElement) {
            // Update timestamp
            const now = new Date();
            timestampElement.textContent = now.toLocaleTimeString();
        }
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    start() {
        this.animate();
    }
}

// Initialize when loaded
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('networkCanvas');
    if (canvas) {
        const visualization = new SacredNexusVisualization(canvas);
        visualization.start();
        
        
        // Connect reset button
        const resetButton = document.getElementById('resetView');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                visualization.generateMetatronCube();
                visualization.createMetatronConnections();
            });
        }
    }
});