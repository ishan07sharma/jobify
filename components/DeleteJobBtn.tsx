import { Button } from './ui/button';
import { Badge } from './ui/badge';
import JobInfo from './JobInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobAction } from '@/utils/action';
import { useToast } from '@/components/ui/use-toast';

export default function DeleteJobBtn({id}:{id:string}){
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const {mutate,isPending}=useMutation({
        mutationFn:(id:string)=>deleteJobAction(id),
        onSuccess:(data)=>{   
            if(!data){
                toast({ description: 'something wrong' });
                return;
            }
        
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
        queryClient.invalidateQueries({ queryKey: ['stats'] });
        queryClient.invalidateQueries({ queryKey: ['charts'] });
        toast({ description: 'job deleted' });
        },
        
    });

    return(
        <Button
      size='sm'
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? 'deleting...' : 'delete'}
    </Button>
    )
}