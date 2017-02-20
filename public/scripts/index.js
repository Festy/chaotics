var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies;

var engine = Engine.create(),
    world = engine.world;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: Math.min(document.documentElement.clientWidth),
        height: Math.min(document.documentElement.clientHeight),
        showAngleIndicator: false
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

var ball = Bodies.circle(Math.min(document.documentElement.clientWidth)/2, Math.min(document.documentElement.clientHeight)/2 + 100, 50, { density: 0.04, frictionAir: 0.005});

World.add(world, ball);

World.add(world, Constraint.create({
    pointA: { x: Math.min(document.documentElement.clientWidth)/2, y: Math.min(document.documentElement.clientHeight)/2 },
    bodyB: ball
}));

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;