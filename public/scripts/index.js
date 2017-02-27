var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies;

var engine = Engine.create();
    engine.world = World.create({
    gravity: {
        x: 0,
        y: 1,
        scale: 0.005
    }
});
var world = engine.world;


var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: Math.min(document.documentElement.clientWidth),
        height: Math.min(document.documentElement.clientHeight),
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

//

var topLocation = {
    x : Math.min(document.documentElement.clientWidth)/2,
    y : Math.min(document.documentElement.clientHeight)/2
}

var ball1 = Bodies.rectangle(topLocation.x, topLocation.y + 50, 10, 100, { density: 0.1, friction:0, frictionAir: 0, collisionFilter: {group: -1}});
var ball2 = Bodies.rectangle(topLocation.x, topLocation.y + 140, 10, 100, { density: 0.1, friction:0, frictionAir: 0, collisionFilter: {group: -1}});


World.add(world, ball1);
World.add(world, ball2);

World.add(world, Constraint.create({
    pointA: { x: topLocation.x , y: topLocation.y},
    pointB: { x: 0, y: -50},
    bodyB: ball1,
    stiffness: 1
}));

World.add(world, Constraint.create({
    bodyA: ball1,
    pointA: { x: 0, y: 45},
    bodyB: ball2,
    pointB: { x: 0, y: -45},
    stiffness: 1
}));

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 1,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;