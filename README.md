# Initial Profiling with React Dev Tools Profiler

Before applying optimizations, the application was profiled using React Dev Tools Profiler. Below are the key performance metrics recorded:

Parameters Checked:

Commit Duration: [1.9s] – Time taken for React to render the committed updates.

Render Duration: [25,7ms] – Time taken for individual components to render.

Interactions, Flame Graph, Ranked Chart:
![Not optimizate](<Снимок экрана 2025-03-23 103611.png>)
![Not optimizate](<Снимок экрана 2025-03-23 103630.png>)
![Not optimizate](<Снимок экрана 2025-03-23 104711.png>)

# Optimization with React.memo and useMemo

To improve performance, React.memo and useMemo were used to prevent unnecessary re-renders and memoize values.

After implementing these optimizations, the same profiling was conducted again to measure improvements.

Parameters Compared:

Commit Duration: [Before: 1,9s] → [After: 2,2 s] – Reduction in time taken for React to render committed updates.

Render Duration: [Before: 25,7ms] → [After: 13ms] – Reduction in time taken for individual components to render.

Interactions, Flame Graph, Ranked Chart:
![Optimizate](<Снимок экрана 2025-03-23 102401-1.png>)
![Optimizate](<Снимок экрана 2025-03-23 102708.png>)
![Optimizate](<Снимок экрана 2025-03-23 102752.png>)
