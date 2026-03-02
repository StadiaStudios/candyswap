const VFX = {
    shake: function(element, intensity = 5, duration = 500) {
        if (!element) return;
        const startTime = Date.now();
        const originalTransform = element.style.transform || '';
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const remaining = 1 - (elapsed / duration);
                const x = (Math.random() - 0.5) * intensity * remaining;
                const y = (Math.random() - 0.5) * intensity * remaining;
                element.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(animate);
            } else {
                element.style.transform = originalTransform;
            }
        };
        requestAnimationFrame(animate);
    },

    // Create a radiant line effect for bombs
    createBombLines: function(container, x, y, size) {
        const lineCount = 8;
        const colors = ['#ffffff', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            const angle = (i / lineCount) * 360;
            line.style.position = 'absolute';
            line.style.left = `${x}px`;
            line.style.top = `${y}px`;
            line.style.width = '2px';
            line.style.height = `${size * 2}px`;
            line.style.background = `linear-gradient(to top, transparent, ${colors[i % colors.length]})`;
            line.style.transformOrigin = 'bottom center';
            line.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
            line.style.opacity = '1';
            line.style.zIndex = '100';
            line.style.pointerEvents = 'none';
            line.style.transition = 'all 0.6s ease-out';
            
            container.appendChild(line);
            
            // Animate out
            requestAnimationFrame(() => {
                line.style.height = `${size * 5}px`;
                line.style.opacity = '0';
                setTimeout(() => line.remove(), 600);
            });
        }
    },

    createParticles: function(container, x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            p.style.width = '6px';
            p.style.height = '6px';
            p.style.borderRadius = '50%';
            p.style.backgroundColor = 'white';
            p.style.boxShadow = '0 0 10px white';
            p.style.zIndex = '99';
            p.style.pointerEvents = 'none';
            
            const vx = (Math.random() - 0.5) * 10;
            const vy = (Math.random() - 0.5) * 10;
            
            container.appendChild(p);
            
            let opacity = 1;
            let curX = x;
            let curY = y;

            const move = () => {
                opacity -= 0.05;
                curX += vx;
                curY += vy;
                p.style.left = `${curX}px`;
                p.style.top = `${curY}px`;
                p.style.opacity = opacity;
                
                if (opacity > 0) requestAnimationFrame(move);
                else p.remove();
            };
            requestAnimationFrame(move);
        }
    }
};

window.VFX = VFX;