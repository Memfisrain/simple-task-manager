<h1> simple-task-manager </h1>
Angular task manager which store tasks in localStorage.

<p>In left side of your page we have form of task in which need specify some information about job (some field are required). Field <strong><i>date</i></strong> have default value equal today date and field <strong><i>time</i></strong> have defualt value equal current time(when page loaded) + 10 min. After added task to us todo-list form is cleaned and set default values.</p>
<p>In right side of page stay todo-list. Its consist from four parts:
<ul>
<li>1. Time remaining for this task. When time expires this task removed from list.</li>
<li>2. Title of task which we specify when fill form.</li>
<li>3. Description section. When cursor hovered over it shown tooltip (if you specify him)</li>
<li>4. Button for added 10 minutes to current remaining time</li>
<li>5. Button for remove task</li>
</ul>
</p>
<p>If we close window or browser by next open this page then application will retrieve the todo-list from localStorage( if date not expired ).</p>
