var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies;

var engineOptions = {
    positionIterations: 100,
    velocityIterations: 100,
    constraintIterations: 100
};

var worldOptions = {
    gravity: {
        x: 0,
        y: 1,
        scale: 0.005
    }
}

var engine = Engine.create();
engine.world = World.create();
var world = engine.world;

var docWidth = document.documentElement.clientWidth;
var docHeight = document.documentElement.clientHeight;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: docWidth,
        height: docHeight,
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

//

var topLocation = {
    x : docWidth/2,
    y : docHeight/2
};

var rectangle1Width, rectangle1Height, rectangle2Width, rectangle2Height;
rectangle1Width = rectangle2Width = 10;
rectangle1Height = rectangle2Height= 100;

var physicalGapBetweenBodies = -10;
var gapBetweenCenterOfBodies = rectangle1Height/2 + rectangle2Height/2 + physicalGapBetweenBodies; // 10 negative gap to make a ~hinge

var rectangle1 = Bodies.rectangle(
    topLocation.x,                      // Location of the center of the body.
    topLocation.y,
    rectangle1Width, rectangle1Height,
    {
        density: 0.1,
        friction:0,
        frictionAir: 0,
        collisionFilter: {
            group: -1
        }
    }
);

var rectangle2 = Bodies.rectangle(
    topLocation.x,
    topLocation.y + gapBetweenCenterOfBodies,
    rectangle2Width,
    rectangle2Height,
    {
        density: 0.1,
        friction:0,
        frictionAir: 0,
        collisionFilter: {
            group: -1
        }
    }
);


World.add(world, rectangle1);
World.add(world, rectangle2);

World.add(world, Constraint.create({
    pointA: { x: topLocation.x , y: topLocation.y - rectangle1Height/2}, // Make the constraint connect at the top of the obj
    pointB: { x: 0, y: -rectangle1Height/2}, // position of the constraint
    bodyB: rectangle1,
    stiffness: 1
}));

World.add(world, Constraint.create({
    bodyA: rectangle1,
    pointA: { x: 0, y: (rectangle1Height + physicalGapBetweenBodies)/2}, // just above the bottom of the body
    bodyB: rectangle2,
    pointB: { x: 0, y: -(rectangle2Height + physicalGapBetweenBodies)/2}, // just below the top of the body
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