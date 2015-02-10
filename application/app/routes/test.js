/**
 * Created by GDanjou on 10/02/15.
 */


var parent = new Parent({});
parent.save();
var child = new Child({parent:parent._id});
child.save() //the parent children property will now contain child's id
//child.remove() //the parent children property will no longer contain the child's i